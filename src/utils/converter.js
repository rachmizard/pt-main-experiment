export const convertIDR = (value) => {
     return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 2,
     }).format(value);
};

export const convertDateFormat = (date) => {
     const options = {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          timeZoneName: "short",
     };

     return new Intl.DateTimeFormat("id", options).format(date);
};
