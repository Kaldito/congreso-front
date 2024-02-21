import { Button, Heading, Input, Select, useToast } from '@chakra-ui/react';
import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
  // --------------- HOOKS --------------- //
  const toast = useToast(); // - Este hook se encarga de mostrar notificaciones en la pantalla

  // --------------- STATES --------------- //
  // - Documentacion: https://legacy.reactjs.org/docs/hooks-state.html
  const [matricula, setMatricula] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [carrera, setCarrera] = useState('');

  // --------------- REGISTRAR ASISTENCIA --------------- //
  // - Esta funcion se encarga de registrar la asistencia en la base de datos
  const registrarAsistencia = async () => {
    // Validar que los campos no estén vacíos
    // Se usa .trim() para eliminar los espacios en blanco
    if (
      matricula.trim() === '' ||
      nombre.trim() === '' ||
      apellidoPaterno.trim() === '' ||
      apellidoMaterno.trim() === '' ||
      carrera.trim() === ''
    ) {
      toast({
        title: 'Error',
        description: 'Todos los campos son obligatorios',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // Guardar en la base de datos haciendo un fetch a la API
    try {
      const res = await fetch('http://localhost:3001/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          matricula: matricula.trim(),
          nombre: nombre.trim(),
          a_paterno: apellidoPaterno.trim(),
          a_materno: apellidoMaterno.trim(),
          carrera: carrera.trim(),
        }),
      });

      // Si el status es 201, entonces se registró correctamente
      if (res.status == 201) {
        toast({
          title: 'Éxito',
          description: 'Asistencia registrada correctamente',
          status: 'success',
          variant: 'left-accent',
          duration: 5000,
          isClosable: true,
        });

        // Limpiar los campos
        setMatricula('');
        setNombre('');
        setApellidoPaterno('');
        setApellidoMaterno('');
        setCarrera('');
      } else {
        toast({
          title: 'Error',
          description: 'Ocurrió un error al registrar tu asistencia',
          variant: 'left-accent',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Ocurrió un error al registrar tu asistencia',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      {/* // -------------- HEAD DEL PROYECTO ---------------- // */}
      <Head>
        <title>Registra tu Asistencia</title>
        <meta name="description" content="Registra tu Asistencia" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* // -------------- CONTENIDO DE LA PÁGINA ---------------- // */}
      {/* // --------- TITULO DE LA PÁGINA --------- // */}
      <Heading>Registra tu Asistencia</Heading>

      {/* // --------- FORMULARIO --------- // */}
      {/* // - INPUT DE MATRICULA - // */}
      <Input
        placeholder="Matricula"
        value={matricula}
        onChange={(e) => setMatricula(e.target.value)}
      />

      {/* // - INPUT DE NOMBRE - // */}
      <Input
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      {/* // - INPUT DE APELLIDO PATERNO - // */}
      <Input
        placeholder="Apellido Paterno"
        value={apellidoPaterno}
        onChange={(e) => setApellidoPaterno(e.target.value)}
      />

      {/* // - INPUT DE APELLIDO MATERNO - // */}
      <Input
        placeholder="Apellido Materno"
        value={apellidoMaterno}
        onChange={(e) => setApellidoMaterno(e.target.value)}
      />

      {/* // - SELECT DE CARRERA - // */}
      <Select value={carrera} onChange={(e) => setCarrera(e.target.value)}>
        <option value="">Seleccione una carrera...</option>
        <option value="ISC">ISC</option>
        <option value="IME">IME</option>
        <option value="ISA">ISA</option>
        <option value="IIS">IIS</option>
      </Select>

      {/* // - BOTÓN DE REGISTRO - // */}
      <Button colorScheme="blue" onClick={registrarAsistencia}>
        Registrar mi Asistencia
      </Button>
    </>
  );
}
