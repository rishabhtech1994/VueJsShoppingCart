var PRICE=100;
var LOAD_DATA=10;

new Vue({
	el:'#app',
	data:{
		total: 0, //comma important
	items:[],
	cart:[],
	results:[],
	search:'anime',
	lastSearch:'',
	loading:false,
	price: PRICE
	},

	methods:{
		/*appendItems:function(){

			console.log("append items");
		},*/


		onSubmit:function(){
			if(this.search.length){
			this.items=[];
			this.loading=true;
			this.$http.get('/search/'.concat(this.search)).then(function(res){
				this.lastSearch=this.search;
				this.items=res.data;
				//this.items=res.data.slice(0,LOAD_DATA);
				this.loading=false;
			});

		}
	},

		addItem: function(index){
			//console.log(index);

			// Adding logic of showing different item in cart ones
			var item=this.items[index];
			this.total=this.total + PRICE; // Calculating the price
			var item_found=false;
			for(var i=0; i<this.cart.length; i++){
				if(this.cart[i].id === item.id){
					item_found=true;
					this.cart[i].qty++;
					break;
				}
			}
			if(!item_found){
			this.cart.push({  //adding items in cart
				id:item.id,
				title: item.title,
				qty:1,
				price: PRICE
			}); 
			} 	
		},

		increment:function(item){
			item.qty++;
			this.total=this.total + PRICE;

		},

		decrement:function(item){
			item.qty--;
			this.total=this.total - PRICE;
			//condition for not going below 0
			if(item.qty<=0){
				for (var i=0;i<this.cart.length;i++){
					if(this.cart[i].id === item.id){
						this.cart.splice(i,1);
						break; 
					}
				}
			}
		}
	},

	filters:{
		currency:function(price){
			return 'Rs.'. price;
		}
	},
	mounted:function(){
		this.onSubmit();
		//var scrollMonitor = require("./scrollMonitor");
		/*var vueInstance=this;
	var myElement = document.getElementById("product-list-bottom");

var elementWatcher = scrollMonitor.create( myElement );

elementWatcher.enterViewport(function() {
    console.log( 'I have entered the viewport' );
});
elementWatcher.exitViewport(function() {
    console.log( 'I have left the viewport' );
});
	}*/
}
});
