export const submitMove = (id, row, column, number) => {
  fetch(`http://localhost:8080/${id}/move`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      row: row,
      column: column,
      number: number,
    }),
  }).then((response) => {
    console.log(response);
  }).catch((error) => {
    console.log(error);
  });
};
