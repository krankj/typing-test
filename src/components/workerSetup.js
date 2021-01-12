export default class WebWorker {
  constructor(worker) {
    let code = worker.toString();
    code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}")); //remove this if unnecessary

    // const blob = new Blob(["(" + code + ")()"], {
    //   type: "application/javascript",
    // });
    const blob = new Blob([code], {
      type: "application/javascript",
    });
    return new Worker(URL.createObjectURL(blob));
  }
}
