import StackNode from "./StackNode.js";

class Stack {
   constructor() {
      this.__top = null;
   }

   push(object) {
      const current = new StackNode(object);

      if (this.isEmpty()) {
         this.top = current;
      } else {
         current.next = this.top;
         this.top = current;
      }
   }

   query() {
      if (this.isEmpty()) {
         return null;
      } else {
         return this.top.object;
      }
   }

   pop() {
      if (this.isEmpty()) {
         return null;
      } else {
         const objectToRemove = this.top.object;
         this.top = this.top.next;

         return objectToRemove;
      }
   }

   isEmpty() {
      return this.__top == null;
   }

   get top() {
      return this.__top;
   }

   set top(newNode) {
      this.__top = newNode;
   }
}

export default Stack;
