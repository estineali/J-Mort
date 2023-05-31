
export function ResolveRequest(params) {
  return new Promise((resolve, reject) => {
    try {
      const options = {
        method: params.method,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: params.token ? "Bearer " + params.token : "",
        },
      };

      if (params.body) {
        options.body = JSON.stringify(params.body);
      }

      let url = params.url;

      if (params.query) {
        url +=
          "?" +
          Object.keys(params.query)
            .map((k) => {
              if (params.query[k] == "") {
                return;
              }
              return k + "=" + params.query[k];
            })
            .join("&");
      }

      fetch(url, options)
        .then((response) => response.json())
        .then((resp) => {
          let error = 0;
          if (resp.status === 401) {
            return;
          }
          if (
            typeof resp.status == "number" &&
            Math.floor(resp.status / 100) != 2
          ) {
            reject(resp);
            return;
          }
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (err) {
      reject(err);
    }
  });
}
