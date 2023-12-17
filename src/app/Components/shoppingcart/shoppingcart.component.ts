import { ProductService } from 'src/app/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class ShoppingcartComponent implements OnInit {

  constructor(private service: ProductService) { }

  cartData: any[] = [];
  sortedCartData: any[] = [];
  totalQuantity: number = 0;
  totalPrice: number = 0;
  Total: number = 0;
  grandTotal: number;


  ngOnInit(): void {
    this.UpdateCart()
    this.finalPrice()
    this.calculateGrandTotal()
    this.storeDatainSortedArrayWithGrandTotal()
    this.getuserDetails()
  }

  updateQuantity(event: any, item: any) {
    const newValue = event.target.value;
    const Quantity = parseInt(newValue, 10);
    const bookId = item.bookid;
    console.log("bookId", bookId);
    console.log("Quantity", Quantity);

    // Retrieve cart data from local storage
    const cartDataString = localStorage.getItem("cart");
    if (cartDataString) {
      const cartData = JSON.parse(cartDataString);

      // Find the book with the specified bookId in the cart
      const bookIndex = cartData.findIndex((cartItem: any) => cartItem.bookid === bookId);

      if (bookIndex !== -1) {
        // Update the original quantity to the new quantity
        cartData[bookIndex].quantity = Quantity;

        // Adjust duplicates based on the quantity difference for the specific product
        const currentDuplicates = cartData.filter((cartItem: any) => cartItem.bookid === bookId).length - 1;

        if (Quantity > currentDuplicates + 1) {
          // Create duplicates when increasing quantity
          const duplicatesToAdd = Quantity - currentDuplicates - 1;
          for (let i = 0; i < duplicatesToAdd; i++) {
            cartData.push({ ...cartData[bookIndex] });
          }
        } else if (Quantity < currentDuplicates + 1) {
          // Remove duplicates when decreasing quantity
          const duplicatesToRemove = currentDuplicates - Quantity + 1;
          const duplicatesToRemoveIndices = [];
          for (let i = 0; i < duplicatesToRemove; i++) {
            const indexToRemove = cartData.findIndex((cartItem: any) => cartItem.bookid === bookId);
            if (indexToRemove !== -1) {
              duplicatesToRemoveIndices.push(indexToRemove);
            }
          }
          duplicatesToRemoveIndices.forEach(index => {
            cartData.splice(index, 1);
          });
        }

        // Save the updated cart data back to local storage
        localStorage.setItem("cart", JSON.stringify(cartData));
      }

      // Recalculate totals without modifying sortedCartData
      this.calculateGrandTotal();
      this.finalPrice();
      // this.UpdateCart()
      this.storeDatainSortedArrayWithGrandTotal()
    }
  }














  finalPrice() {
    // this.sortedCartData.forEach(element => {
    //   const totalPrice = element.price * element.quantity;
    //   this.Total += totalPrice;
    //   // this.grandTotal = this.Total + 10
    //   // this.grandTotal += totalPrice
    // });
    var total = this.sortedCartData.reduce((total, item) => total + item.price * item.quantity, 0);
    this.Total = + total
  }


  storeDatainSortedArrayWithGrandTotal() {

    // Add the grandTotal to each item in sortedCartData
    this.sortedCartData = this.sortedCartData.map(item => ({
      ...item,
      grandTotal: this.grandTotal
    }));

    // Add the grandTotal to each item in sortedCartData
    this.sortedCartData = this.sortedCartData.map(item => ({
      ...item,
      SubTotal: this.Total
    }));


    // Store the updated data in local storage
    localStorage.setItem("checkout", JSON.stringify(this.sortedCartData));
  }


  preventTyping(event: any) {
    // Prevent manual typing by disabling keydown event
    event.preventDefault();
  }



  calculateGrandTotal() {
    var total = this.sortedCartData.reduce((total, item) => total + item.price * item.quantity, 0);
    this.grandTotal = + total + 10
  }







  UpdateCart() {
    const existingCartItemsString = localStorage.getItem('cart');
    const existingCartItems = existingCartItemsString ? JSON.parse(existingCartItemsString) : [];
    this.cartData = existingCartItems;


    // Create maps to store unique items based on bookid and VarietyID and count duplicates
    const bookItemsMap = new Map();
    const varietyItemsMap = new Map();
    const bookIdCounts = new Map();
    const varietyIdCounts = new Map();

    let totalQuantity = 0; // Variable to store the total quantity
    let totalPrice = 0; // Variable to store the total price

    for (const item of this.cartData) {
      const bookId = item.bookid;
      const varietyId = item.VarietyID;


      if (item.IData) {
        // Assuming item.IData contains base64-encoded image data
        const decodedImageData = this.imageDecode(item.IData) // Decode base64
        item.DecodedImageData = decodedImageData;
      }


      if (item.varietyName) {
        const varietyKey = `${varietyId}_${item.varietyName}`;

        if (varietyItemsMap.has(varietyKey)) {
          // Item with the same varietyId and varietyName exists, update quantity
          varietyItemsMap.get(varietyKey).quantity++;
        } else {
          // Item with the varietyId and varietyName doesn't exist, add it to the map
          varietyItemsMap.set(varietyKey, { ...item, quantity: 1 });
        }

        // Update or initialize varietyId counts
        varietyIdCounts.set(varietyId, (varietyIdCounts.get(varietyId) || 0) + 1);
      } else {
        const bookKey = `${bookId}_${item.bookName}`;

        if (bookItemsMap.has(bookKey)) {
          // Item with the same bookId and bookName exists, update quantity
          bookItemsMap.get(bookKey).quantity++;
        } else {
          // Item with the bookId and bookName doesn't exist, add it to the map
          bookItemsMap.set(bookKey, { ...item, quantity: 1 });
        }

        // Update or initialize bookId counts
        bookIdCounts.set(bookId, (bookIdCounts.get(bookId) || 0) + 1);
      }

      // Parse price and quantity as numbers
      const itemPrice = parseFloat(item.price);
      const itemQuantity = parseFloat(item.quantity);

      // Check if parsed values are valid numbers
      if ((itemPrice) && !isNaN(itemQuantity)) {
        totalQuantity += itemQuantity;
        totalPrice += itemPrice * itemQuantity;
      }
    }

    // Convert the map values back to arrays
    const updatedBookData = Array.from(bookItemsMap.values());
    const updatedVarietyData = Array.from(varietyItemsMap.values());

    // Combine book and variety arrays
    const updatedCartData = [...updatedBookData, ...updatedVarietyData];

    // Sort the array based on the composite ID or any other criteria
    updatedCartData.sort((a, b) => {
      const aId = a.varietyName ? `${a.VarietyID}_${a.varietyName}` : `${a.bookid}_${a.bookName}`;
      const bId = b.varietyName ? `${b.VarietyID}_${b.varietyName}` : `${b.bookid}_${b.bookName}`;

      return aId.localeCompare(bId);
    });

    // Add the quantity count and ProductName to sortedCartData
    this.sortedCartData = updatedCartData.map(item => {
      const quantity = item.varietyName ? varietyIdCounts.get(item.VarietyID) || 1 : bookIdCounts.get(item.bookid) || 1;
      const productNames = [];
      const Iimagedata = [];

      if (item.bookName) {
        productNames.push(item.bookName);
      }

      if (item.varietyName) {
        productNames.push(item.varietyName);
      }


      if (item.IData) {
        Iimagedata.push(item.varietyName);
      }

      const productName = productNames.join(' - ');

      return {
        ...item,
        quantity,
        ProductName: productName,
      };
    });


    // Update the totalQuantity and totalPrice variables
    this.totalQuantity = totalQuantity;
    this.totalPrice = totalPrice;

    // Update local storage with the sortedCartData
    localStorage.setItem('cart', JSON.stringify(this.sortedCartData));


  }




  imagedata: any

  imageDecode(data: any) {


    const byteCharacters = atob(data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/octet-stream' });

    // Create a URL for the blob
    var FileData = URL.createObjectURL(blob);
    // books.IData = this.bookimgData
    // console.log(books.File.FileData)
    // var data = books.File.FileData
    // console.log("bookimgData", data)
    console.log("data", FileData)
    return FileData
  }


  userloggedin: boolean = false
  userid: any
  getuserDetails() {
    var checkuser = localStorage.getItem("userid")
    if (checkuser) {
      this.userloggedin = true
      this.userid = checkuser
    }
    else {
      this.userloggedin = false
    }

  }


  removeItem(item: any) {
    // Get cart data from localStorage and parse it
    const getCartDataFromLocal: any[] = JSON.parse(localStorage.getItem('cart') || '[]');

    // Find the index of the item with a matching ID in the cart array
    const index = getCartDataFromLocal.findIndex((cartItem: any) => {
      // Assuming 'bookid' is the ID you want to match
      return cartItem.bookid === item.bookid || cartItem.VarietyID === item.VarietyID;
    });

    // Remove the item if found
    if (index !== -1) {
      getCartDataFromLocal.splice(index, 1);

      // Update localStorage with the modified cart data
      localStorage.setItem('cart', JSON.stringify(getCartDataFromLocal));
this.ngOnInit()
    }
  }



}
