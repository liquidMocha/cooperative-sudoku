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
  });
};

export const getInitialGame = (id) => {
  return fetch(`http://localhost:8080/${id}`, {
    method: 'GET',
    mode: 'cors',
  }).then((response) => {
    const reader = response.body.getReader();
    return reader.read().then(body => {
      return JSON.parse(new TextDecoder().decode(body.value));
    })
  }).catch(error => {
    console.log(error);
  })

};
