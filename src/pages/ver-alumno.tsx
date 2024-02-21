import formatDate from '@/lib/date/formatDate';
import { Box, Heading } from '@chakra-ui/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';

// - Documentacion: https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props
export async function getServerSideProps(context: GetServerSidePropsContext) {
  // - ESTO SE EJECUTA EN EL SERVIDOR
  // ------ PARAMETROS DEL QUERY ------ //
  const { matricula } = context.query;

  // - Si no hay matricula, redirigir al inicio
  if (!matricula) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  // ------ TRAER LOS DATOS DEL ALUMNO ------ //
  const res = await fetch(`http://localhost:3001/registro/${matricula}`);
  const data = await res.json();

  // - Si no hay datos, redirigir al inicio
  if (!data || data.length == 0) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  // - Retornar los datos del alumno a la página
  return {
    props: {
      alumno: data,
    },
  };
}

interface VerAlumnoProps {
  alumno: any;
}

export default function VerAlumno({ alumno }: VerAlumnoProps) {
  return (
    <>
      {/* // -------------- HEAD DEL PROYECTO ---------------- // */}
      <Head>
        <title>Registro de Alumno</title>
      </Head>
      {/* // -------------- CONTENIDO DE LA PAGINA ---------------- // */}
      <Heading>Registro de Alumno</Heading>
      {/* // - Aqui se muestra la informacion del alumno */}
      <Box>
        Alumno: {alumno[0].nombre} {alumno[0].a_paterno} {alumno[0].a_materno}
      </Box>

      {/* // - Aqui se muestra la matricula del alumno */}
      <Box>Matricula: {alumno[0].matricula}</Box>

      {/* // - Aqui se muestran las fechas en las que el alumno marco su asistencia */}
      <Heading>Fechas Registradas</Heading>
      <Box>
        {alumno.map((registro: any) => {
          return (
            <Box key={registro.id}>
              {/* // - Se usa la funcion formatDate para darle formato a la fecha */}
              {/* // - Esta funcion se encuentra en la carpeta lib */}
              Fecha: {formatDate(registro.createdAt)} - Asistencia:{' '}
              {registro.asist ? 'Si' : 'No'}
            </Box>
          );
        })}
      </Box>
    </>
  );
}
