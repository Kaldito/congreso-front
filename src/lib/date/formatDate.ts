// ------------- FORMATEAR LA FECHA ------------- //
const formatDate = (unformatted_fecha: string) => {
  // Parsear la fecha ISO 8601
  const fecha = new Date(unformatted_fecha);

  // Formatear la fecha a dd/mm/yyyy hh/mm
  const dia = fecha.getDate().toString().padStart(2, '0');
  const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // getMonth() devuelve un índice basado en cero, por lo que se suma 1
  const año = fecha.getFullYear();
  const hora = fecha.getHours().toString().padStart(2, '0');
  const minutos = fecha.getMinutes().toString().padStart(2, '0');

  const fechaFormateada = `${hora}:${minutos} - ${dia}/${mes}/${año}`;

  return fechaFormateada;
};

export default formatDate;
