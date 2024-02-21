import {
  Button,
  Divider,
  MenuItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';

interface RemoveAsistModalProps {
  registro_id: string;
  refreshTable: Function;
}

export default function RemoveAsistModal({
  registro_id,
  refreshTable,
}: RemoveAsistModalProps) {
  // ------------- HOOKS ------------- //
  const { isOpen, onOpen, onClose } = useDisclosure(); // - Este hook se encarga de manejar el estado del modal
  const toast = useToast(); // - Este hook se encarga de mostrar notificaciones en pantalla

  // ------------- ELIMINAR ASISTENCIA ------------- //
  // - Esta función se encarga de marcar como false la asistencia de un registro
  const removeAsistencia = async () => {
    // Hacer un fetch a la API para eliminar la asistencia
    try {
      const res = await fetch(`http://localhost:3001/registro`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: registro_id,
        }),
      });

      if (res.status == 200) {
        toast({
          title: 'Éxito',
          description: 'Asistencia eliminada correctamente',
          status: 'success',
          variant: 'left-accent',
          duration: 5000,
          isClosable: true,
        });

        refreshTable(); // - Refrescar la tabla
        onClose(); // - Cerrar el modal
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Ocurrió un error al eliminar la asistencia',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      {/* // - Boton para abrir el modal */}
      <MenuItem color={'red.500'} fontWeight={'bold'} onClick={onOpen}>
        Eliminar Asistencia
      </MenuItem>

      {/* // - Modal para eliminar la asistencia */}
      {/* // - Documentacion: https://chakra-ui.com/docs/components/modal/usage*/}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontWeight={'bold'} color={'red.500'}>
            Quitar Asistencia
          </ModalHeader>
          <ModalCloseButton />
          <Divider />

          <ModalBody>
            ¿Estás seguro que deseas eliminar la asistencia de este registro?
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cerrar
            </Button>

            {/* // - Boton para eliminar la asistencia */}
            <Button colorScheme="red" onClick={removeAsistencia}>
              Eliminar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
