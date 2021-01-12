const self = window.self;

export default () => {
  self.addEventListener("message", (e) => {
    if (!e) return;
    setInterval(() => {
      postMessage("start");
    }, 100);
  });
};
