class Node {
   constructor(object) {
      this.__object = object;
      this.__next = null;
   }

   get object() {
      return this.__object;
   }

   set object(obj) {
      this.__object = obj;
   }

   get next() {
      return this.__next;
   }

   set next(newNext) {
      this.__next = newNext;
   }
}
