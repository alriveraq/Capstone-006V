const db = require("../../common/config/db");
const oracle = require("oracledb");

const { enviarCorreoJunta } = require('../service/correoservice'); // Cambia la ruta según tu estructura de proyecto


async function crearjunta(
  u_nombre_barrio,
  u_direccion,
  u_fecha_fundacion,
  id_presidente
) {
  let connection;

  try {
    connection = await db.getConnection();

    const result = await connection.execute(
      `CALL PL_CREACION_JUNTA(
            :nombre_barrio, :direccion, :fecha_fundacion, :mensaje, :error_code, :id_junta)`,
      {
        nombre_barrio: { val: u_nombre_barrio, dir: oracle.BIND_IN },
        direccion: { val: u_direccion, dir: oracle.BIND_IN },
        fecha_fundacion: { val: u_fecha_fundacion, dir: oracle.BIND_IN },
        mensaje: { dir: oracle.BIND_OUT, type: oracle.STRING },
        error_code: { dir: oracle.BIND_OUT, type: oracle.STRING },
        id_junta: { dir: oracle.BIND_OUT, type: oracle.NUMBER },
      }
    );

    const u_mensaje = result.outBinds.mensaje;
    const u_error_code = result.outBinds.error_code;
    const id_junta = result.outBinds.id_junta;
    if (u_error_code) {
      return Promise.reject({
        code: u_error_code,
        message: u_mensaje,
      });
    }

    if (!id_junta) {
      throw new Error("No se pudo obtener el ID_JUNTA.");
    }
    await connection.execute(
      `INSERT INTO INFO_JUNTA (ID_INFO_JUNTA, ID_JUNTA, ID_PRESIDENTE, ID_TESORERO, ID_SECRETARIO)
            VALUES (id_sequence.NEXTVAL, :id_junta, :id_presidente, NULL, NULL)`,
      {
        id_junta: { val: id_junta, dir: oracle.BIND_IN },
        id_presidente: { val: id_presidente, dir: oracle.BIND_IN },
      }
    );

    await connection.execute(
      `UPDATE USUARIO SET ID_JUNTA = :id_junta, ID_ROL = 1 WHERE ID_USUARIO = :id_presidente`,
      {
        id_junta: { val: id_junta, dir: oracle.BIND_IN },
        id_presidente: { val: id_presidente, dir: oracle.BIND_IN },
      }
    );

    await connection.commit();
  } catch (error) {
    console.error("Error executing stored procedure from repository:", error);
    throw new Error("Internal Server Error from repository");
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing the connection:", err);
      }
    }
  }
}

async function obtenerCorreosJunta(id_junta) {
  const query = `
        SELECT email
        FROM USUARIO
        WHERE id_junta = :id_junta`;

  const result = await db.execute(query, { id_junta });
  return result.rows.map((row) => row[0]); // Devuelve una lista de correos
}

async function crearpublicacion(
  u_id_junta,
  u_id_usuario,
  u_titular,  // Cambié de u_titulo a u_titular
  u_contenido,
  u_imagen, // Asegúrate de que esto sea un Buffer o un BLOB
  enviarCorreo
) {
  let connection;
  try {
    let imagenBuffer;
    if (typeof u_imagen === "string" && u_imagen.startsWith("data:image/")) {
      const base64Data = u_imagen.split(",")[1];
      imagenBuffer = Buffer.from(base64Data, "base64");
    } else if (Buffer.isBuffer(u_imagen)) {
      imagenBuffer = u_imagen; // Asegúrate de que sea un Buffer
    } else {
      throw new Error(
        "El formato de la imagen no es válido. Debe ser un Buffer o una cadena Base64."
      );
    }

    connection = await db.getConnection();

    // Convertir enviarCorreo a un valor numérico (1 para true, 0 para false)
    const enviarCorreoValue = enviarCorreo ? 1 : 0;

    const result = await connection.execute(
      `CALL PL_CREACION_PUBLICACION(:u_titular, :u_contenido, :u_imagen, :u_id_usuario, :u_id_junta, :enviar_correo, :mensaje, :error_code, :id_publicaciones)`,
      {
        u_titular: { val: u_titular, dir: oracle.BIND_IN, type: oracle.STRING },
        u_contenido: { val: u_contenido, dir: oracle.BIND_IN, type: oracle.STRING },
        u_imagen: { val: imagenBuffer, dir: oracle.BIND_IN, type: oracle.BLOB },
        u_id_usuario: { val: parseInt(u_id_usuario, 10), dir: oracle.BIND_IN, type: oracle.NUMBER }, // Asegúrate de que sea un número
        u_id_junta: { val: parseInt(u_id_junta, 10), dir: oracle.BIND_IN, type: oracle.NUMBER }, // Asegúrate de que sea un número
        enviar_correo: { val: enviarCorreoValue, dir: oracle.BIND_IN, type: oracle.NUMBER }, // Convertir a número
        mensaje: { dir: oracle.BIND_OUT, type: oracle.STRING },
        error_code: { dir: oracle.BIND_OUT, type: oracle.STRING },
        id_publicaciones: { dir: oracle.BIND_OUT, type: oracle.NUMBER },
      }
    );

    const u_mensaje = result.outBinds.mensaje;
    const u_error_code = result.outBinds.error_code;

    if (u_error_code) {
      return Promise.reject({
        code: u_error_code,
        message: u_mensaje,
      });
    } else {
      console.log("Inserción exitosa:", u_mensaje);

      if (enviarCorreo) {
        const correos = await obtenerCorreosJunta(u_id_junta);
        console.log("Correos obtenidos:", correos);
        await enviarCorreoJunta(correos, u_titular, u_contenido, imagenBuffer);
      }

      return { id_publicaciones: result.outBinds.id_publicaciones };
    }
  } catch (error) {
    console.error("Error executing stored procedure from repository:", error);
    throw new Error("Internal Server Error from repository");
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing the connection:", err);
      }
    }
  }
}




module.exports = { crearjunta, crearpublicacion };
