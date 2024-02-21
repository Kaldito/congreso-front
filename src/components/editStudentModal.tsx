import {
  Button,
  Divider,
  FormLabel,
  Input,
  MenuItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';

interface EditStudentModalProps {
  student: any;
  refreshTable: Function;
}

export default function EditStudentModal({
  student,
  refreshTable,
}: EditStudentModalProps) {
  // ------------- HOOKS ------------- //
  const { isOpen, onOpen, onClose } = useDisclosure(); // - Este hook se encarga de manejar el estado del modal
  const toast = useToast(); // - Este hook se encarga de mostrar notificaciones en pantalla

  // ------------- STATES ------------- //
  const [nombre, setNombre] = useState(student.nombre);
  const [apellidoPaterno, setApellidoPaterno] = useState(student.a_paterno);
  const [apellidoMaterno, setApellidoMaterno] = useState(student.a_materno);
  const [carrera, setCarrera] = useState(student.carrera);

  // ------------- EDITAR ALUMNO ------------- //
  // - Esta función se encarga de editar un alumno en la base de datos
  const editStudent = async () => {
    // Validar que los campos no estén vacíos
    if (
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

    // Guardar en la base de datos
    try {
      const res = await fetch(`http://localhost:3001/registro`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          matricula: student.matricula,
          nombre: nombre.trim(),
          a_paterno: apellidoPaterno.trim(),
          a_materno: apellidoMaterno.trim(),
          carrera: carrera.trim(),
        }),
      });

      if (res.status == 200) {
        toast({
          title: 'Éxito',
          description: 'Alumno editado correctamente',
          status: 'success',
          variant: 'left-accent',
          duration: 5000,
          isClosable: true,
        });

        refreshTable(); // - Refrescar la tabla
      } else {
        toast({
          title: 'Error',
          description: 'Ocurrió un error al editar el alumno',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Ocurrió un error al editar el alumno',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }

    onClose(); // - Cerrar el modal
  };

  return (
    <>
      {/* // -------- BOTON PARA ABRIR EL MODAL -------- // */}
      <MenuItem onClick={onOpen}>Editar Alumno</MenuItem>

      {/* // -------- MODAL PARA EDITAR ALUMNO -------- // */}
      {/* // - Documentacion: https://chakra-ui.com/docs/components/modal/usage*/}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontWeight={'bold'}>Editar Alumno</ModalHeader>
          <ModalCloseButton />
          <Divider />

          <ModalBody>
            {/* // --------- FORMULARIO --------- // */}
            {/* // - INPUT DE NOMBRE - // */}
            <FormLabel>Nombre:</FormLabel>
            <Input
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />

            {/* // - INPUT DE APELLIDO PATERNO - // */}
            <FormLabel>Apellido Paterno:</FormLabel>
            <Input
              placeholder="Apellido Paterno"
              value={apellidoPaterno}
              onChange={(e) => setApellidoPaterno(e.target.value)}
            />

            {/* // - INPUT DE APELLIDO MATERNO - // */}
            <FormLabel>Apellido Materno:</FormLabel>
            <Input
              placeholder="Apellido Materno"
              value={apellidoMaterno}
              onChange={(e) => setApellidoMaterno(e.target.value)}
            />

            {/* // - SELECT DE CARRERA - // */}
            <FormLabel>Carrera:</FormLabel>
            <Select
              value={carrera}
              onChange={(e) => setCarrera(e.target.value)}
            >
              <option value="ISC">ISC</option>
              <option value="IME">IME</option>
              <option value="ISA">ISA</option>
              <option value="IIS">IIS</option>
            </Select>
          </ModalBody>

          <ModalFooter>
            <Button variant={'ghost'} mr={3} onClick={onClose}>
              Cerrar
            </Button>

            {/* // - BOTÓN DE GUARDAR CAMBIOS - // */}
            <Button colorScheme="blue" onClick={editStudent}>
              Guardar Cambios
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
