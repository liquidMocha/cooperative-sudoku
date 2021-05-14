const host = "http://localhost:8080";

export const submitMove = (id, row, column, number) => {
  fetch(`${host}/${id}/move`, {
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

export const getGame = (id) => {
  return fetch(`${host}/${id}`, {
    method: 'GET',
    mode: 'cors',
  }).then((response) => {
    const reader = response.body.getReader();
    return reader.read().then(body => {
      return JSON.parse(new TextDecoder().decode(body.value));
    });
  }).catch(error => {
    console.log(error);
  });

};

export const startNewGame = () => {
  return fetch(`${host}/start`, {
    method: 'POST',
    mode: 'cors',
  }).then((response) => {
    const reader = response.body.getReader();
    return reader.read().then(foo => {
      return JSON.parse(new TextDecoder().decode(foo.value)).id;
    });
  }).catch((error) => {
    console.log(error);
  });

};
