const self = window.self;

export default () => {
  self.onmessage = function (e) {
    if (!e) return;
    setInterval(() => {
      self.postMessage("start");
    }, 100);
  };

  // self.addEventListener("message", (e) => {
  //   if (!e) return;
  //   setInterval(() => {
  //     postMessage("start");
  //   }, 100);
  // });
};
