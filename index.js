var app = new Vue({
   el: '#app',
   data: {
       message: 'Здравствуйте!',
       amount: 0,
       yourWallet: [
           {value: 1, quantity: 10},
           {value: 2, quantity: 30},
           {value: 5, quantity: 20},
           {value: 10, quantity: 15},
       ],
       vmWallet: [
           {value: 1, quantity: 100},
           {value: 2, quantity: 100},
           {value: 5, quantity: 100},
           {value: 10, quantity: 100},
       ],
       vmStock: [
           {id:'tea', name: 'чай', price: 13, quantity: 10},
           {id:'coffee', name: 'кофе', price: 18, quantity: 20},
           {id:'whiteCoffee', name: 'кофе с молоком', price: 21, quantity: 20},
           {id:'juice', name: 'сок', price: 35, quantity: 15},
       ],
   },
   methods: {
       addToDeposit: function (ind) {
           const val = this.yourWallet[ind].value;
           if (this.yourWallet[ind].quantity > 0)
               this.yourWallet[ind].quantity--;

           this.vmWallet.forEach((item,index) => {
               if (item.value == val)
                   this.vmWallet[index].quantity++;
           });
           this.amount += val;
       },
       buy: function (ind) {
           const price = this.vmStock[ind].price;
           if (this.amount >= price) {
               this.amount -= price;
               this.vmStock[ind].quantity--;
               this.message = 'Спасибо!';
           } else {
               this.message = 'Недостаточно средств'
           }
       },
       giveChange: function () {
           const index = this.vmWallet.length-1;
           for (let i = index; i >= 0; i--) {
               if (this.amount > 0 && this.vmWallet[i].quantity > 0){
                   while (this.amount >= this.vmWallet[i].value){
                       this.vmWallet[i].quantity--;
                       this.yourWallet.forEach((item,index) => {
                           if (item.value == this.vmWallet[i].value)
                               this.yourWallet[index].quantity++;
                       });
                       this.amount -= this.vmWallet[i].value;
                   }
               }
           }
       }
   },
    watch: {
        amount: function (newAmount, oldAmount) {
            // сдесь по-хорошому наверное стоит делать недостуупными к заказу товары,
            // цена которых больше внесенного депозита
            if (newAmount < this.vmStock[1].price)
                this.message = 'Недостаточно средств';
            else
                this.message = 'Выберите товар!';
        }
    }
});

