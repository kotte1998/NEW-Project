import { LightningElement,api,track } from 'lwc';
import getAccContacts from '@salesforce/apex/AccountContacts.getAccContacts'
import updateContact from '@salesforce/apex/AccountContacts.updateContact'
import { deleteRecord } from 'lightning/uiRecordApi'; 
export default class editAccounts extends LightningElement {

    @api recordId;
    @track arr =[];
    Show=false
    conId;
    

  connectedCallback(){
    getAccContacts({mainAccountId : this.recordId})
          .then(ravi =>{
            ravi.forEach(factor => {
               this.arr.push({
              Id : factor.Id,
             FirstName : factor.FirstName,
             LastName  : factor.LastName,
             Email  : factor.Email,
             Phone  : factor.Phone,
             inputShow : false 

                });
            });
          
          });
 }

  contEdit(e){
    var currentId = e.currentTarget.dataset.recid;
     this.conId =currentId;
    var non =this.arr.find(rr =>rr.Id === currentId);
        non.inputShow =true
        this.Show =true;

  }

  handleTrack(e){
   var mon = this.arr.find(rr =>rr.Id === this.conId);
   console.log(mon)
   if(e.target.label === "FirstName")
   {
     mon.FirstName = e.target.value;
     console.log(mon.FirstName)
 }
 else if(e.target.label === "LastName")
 {
  mon.LastName = e.target.value;
  console.log(mon.LastName)
}
else if(e.target.label === "Email")
{
  mon.Email = e.target.value;
  console.log(mon.Email)
}
else if(e.target.label === "Phone")
{
  mon.Phone = e.target.value;
  console.log(mon.Phone)
}

  }

  clickme(){
  updateContact({accArray : this.arr })
  .then(() => {
    this.dispatchEvent(
        new ShowToastEvent({
            title: 'Success',
            message: 'Record Is updated',
            variant: 'success',
        }),
    );
})
.catch(error => {
    this.dispatchEvent(
        new ShowToastEvent({
            title: 'Error',
            message: error.message,
            variant: 'error',
        }),
    );
    this.connectedCallback(); 
});
window.location.reload();  

 }

 deleteme(e){
    deleteRecord(e.currentTarget.dataset.recid)
       .then(() => {
        this.dispatchEvent(
        new ShowToastEvent({
            title: 'Success',
            message: 'Record Is Deleted',
            variant: 'success',
          }),
      );
   })
      .catch(error => {
        this.dispatchEvent(
        new ShowToastEvent({
            title: 'Error',
            message: error.message,
            variant: 'error',
        }),
    );
    this.connectedCallback(); 
    });
      window.location.reload();

 }



}