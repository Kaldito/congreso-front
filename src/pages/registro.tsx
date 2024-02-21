import EditStudentModal from '@/components/editStudentModal';
import RemoveAsistModal from '@/components/removeAsistModal';
import formatDate from '@/lib/date/formatDate';
import {
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IoSettingsSharp } from 'react-icons/io5';

export default function Registro() {
  // ------------- HOOKS ------------- //
  const router = useRouter(); // - Este hook se encarga de manejar las rutas de la aplicación

  // ------------- STATES ------------- //
  // - Documentacion: https://legacy.reactjs.org/docs/hooks-state.html
  const [loading, setLoading] = useState<boolean>(true); // - Este estado se encarga de manejar el estado de carga de la página
  const [error, setError] = useState<boolean>(false); // - Este estado se encarga de manejar los errores de la página
  const [registros, setRegistros] = useState<any>([]); // - Aqui se guardan los registros de asistencia

  // ------------- TRAER LOS REGISTROS DE ASISTENCIA ------------- //
  // - Esta funcion se encarga de traer los registros de asistencia de la base de datos
  // - Si se vuelve a llamar, se vuelve a traer los registros por lo tanto se actualiza la tabla
  const fetchRegistros = async () => {
    setLoading(true); // - Cambiar el estado de carga a true

    // Hacer un fetch a la API para traer los registros
    try {
      const res = await fetch('http://localhost:3001/registro');
      const data = await res.json();
      setRegistros(data);
    } catch (error) {
      setError(true);
    }

    setLoading(false); // - Cambiar el estado de carga a false
  };

  // ------------- RENDER INICIAL DE LA PAGINA ------------- //
  // - Este hook se ejecuta al cargar la página
  // - Documentacion: https://reactjs.org/docs/hooks-effect.html
  useEffect(() => {
    fetchRegistros();
  }, []);

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
      <Heading>Registro de Asistencias</Heading>

      {/* // --------- TABLA DE REGISTROS --------- // */}
      <TableContainer>
        <Table>
          {/* // ------ HEAD DE LA TABLA ------ // */}
          <Thead>
            <Tr>
              <Th>Matricula</Th>

              <Th>Carrera</Th>

              <Th>Nombre</Th>

              <Th>Apellido Paterno</Th>

              <Th>Apellido Materno</Th>

              <Th>Fecha</Th>

              <Th>Asistencia</Th>

              <Th isNumeric>Opciones</Th>
            </Tr>
          </Thead>

          {/* // ------ BODY DE LA TABLA ------ // */}
          <Tbody>
            {/* // ------ ROW PARA CUANDO ESTE CARGANDO ------ // */}
            {/* // - Si el estado de carga es true, se muestra un mensaje de "Cargando..." */}
            {loading && (
              <Tr>
                <Td
                  colSpan={8}
                  textAlign={'center'}
                  fontWeight={'bold'}
                  color={'gray.500'}
                >
                  Cargando...
                </Td>
              </Tr>
            )}

            {/* // ------ ROW PARA CUANDO HAYA UN ERROR ------ // */}
            {/* // - Si el estado de error es true, se muestra un mensaje de error */}
            {error && (
              <Tr>
                <Td
                  colSpan={8}
                  textAlign={'center'}
                  fontWeight={'bold'}
                  color={'red.500'}
                >
                  Ocurrió un error al cargar los registros
                </Td>
              </Tr>
            )}

            {/* // ------ ROW PARA CUANDO NO HAY REGISTROS ------ // */}
            {/* // - Si el estado de carga es false y no hay registros, se muestra un mensaje de "No hay registros" */}
            {registros.length === 0 && !loading && (
              <Tr>
                <Td
                  colSpan={8}
                  textAlign={'center'}
                  fontWeight={'bold'}
                  color={'gray.500'}
                >
                  No hay registros
                </Td>
              </Tr>
            )}

            {/* // ------ ROWS DE LOS REGISTROS ------ // */}
            {/* // - Si el estado de carga es false y no hay errores, se muestran los registros */}
            {registros.map((registro: any) => (
              <Tr key={registro.id}>
                {/* // ------ MATRICULA ------ // */}
                <Td>{registro.matricula}</Td>

                {/* // ------ CARRERA ------ // */}
                <Td>{registro.carrera}</Td>

                {/* // ------ NOMBRE ------ // */}
                <Td>{registro.nombre}</Td>

                {/* // ------ APELLIDO PATERNO ------ // */}
                <Td>{registro.a_paterno}</Td>

                {/* // ------ APELLIDO MATERNO ------ // */}
                <Td>{registro.a_materno}</Td>

                {/* // ------ FECHA ------ // */}
                {/* // - Se usa la funcion formatDate para darle formato a la fecha */}
                {/* // - Esta funcion se encuentra en la carpeta lib */}
                <Td>{formatDate(registro.createdAt)}</Td>

                {/* // ------ ASISTENCIA ------ // */}
                <Td>{registro.asist ? 'Sí' : 'No'}</Td>

                {/* // ------ OPCIONES ------ // */}
                {/* // - Este botón se encarga de mostrar las opciones para editar o eliminar un registro */}
                {/* // - Se usa el componente Menu de Chakra UI */}
                {/* // - Documentacion: https://chakra-ui.com/docs/feedback/menu */}
                <Td isNumeric>
                  <Menu autoSelect={false}>
                    <MenuButton
                      as={IconButton}
                      aria-label="Options"
                      colorScheme="blue"
                      icon={<IoSettingsSharp />}
                    />

                    <MenuList>
                      {/* // - Este botón redirige a la página de asistencias de un alumno */}
                      <MenuItem
                        onClick={() => {
                          router.push(
                            `/ver-alumno?matricula=${registro.matricula}`
                          );
                        }}
                      >
                        Asistencias de Alumno
                      </MenuItem>
                      {/* // - Este botón abre un modal para editar un alumno */}
                      {/* // - Se encuentra en la carpeta components */}
                      <EditStudentModal
                        student={registro}
                        refreshTable={fetchRegistros}
                      />
                      <MenuDivider />
                      {/* // - Este botón abre un modal para marcar como inasistencia al registro */}
                      {/* // - Se encuentra en la carpeta components */}
                      <RemoveAsistModal
                        registro_id={registro._id}
                        refreshTable={fetchRegistros}
                      />
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
