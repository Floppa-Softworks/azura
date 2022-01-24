/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import "reflect-metadata";

function ClientBuilder<T extends { new (...args: any[]): {} }>() {
  return function (ctr: T) {
    console.log(ctr.prototype);
  };
}

function AzuraEntry() {
  return function (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log(descriptor);
    Reflect.defineMetadata("ass", 5, descriptor);
  };
}

@ClientBuilder()
class AzuraClientController {
  @AzuraEntry()
  start() {
    console.log("a");
  }
}
new AzuraClientController();
