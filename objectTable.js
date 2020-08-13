import { LightningElement, wire, api, track } from 'lwc';
import getContactList from '@salesforce/apex/ContactController.getContactList';

export default class ContactController extends LightningElement {
    @api objectName='Contact';
    @api fieldNames=['FirstName','LastName','Title','Phone','Email'];
    dataList =[];
    outcomeList=[];
    @track page = 1; //this will initialize 1st page
    @track hidePrevious=true;
    @track hideNext=true;
    @track flag=true;
    @track startingRecord = 1; //start record position per page
    @track endingRecord = 0; //end record position per page
    @track pageSize = 5; //default value we are assigning
    @track totalRecordCount = 0; //total record count received from all retrieved records
    @track totalPage = 0; //total number of page is needed to display all records
    @track conId;
    

    connectedCallback(){
        this.getContactList();
    }


     getContactList(){
         getContactList({objectName:this.objectName,fieldNames:this.fieldNames}).then(response=>{
             if(response){
                 this.outcomeList=response;
                 console.log(JSON.stringify(response));
                 if(this.flag){
                     this.defaultSetting();
                 }
                 else{
                     this.displayRecordPerPage(this.Page);
                 }
             }
         })
         .catch(error=>
            {console.log(error.body.message);
        })

     }

    value = '20';

    get options() {
        return [
            { label: '10', value: '10' },
            { label: '20', value: '20' },
            { label: '30', value: '30' },
            { label: '50', value: '50' },
        ];
    }
    defaultSetting(){
        this.totalRecordCount=this.outcomeList.length;
        this.totalPage = Math.ceil(this.totalRecordCount / this.pageSize);
        this.dataList = this.outcomeList.slice(0,this.pageSize); 
        this.endingRecord = this.pageSize;
        if(this.totalPage>1){
            this.hideNext=false;
        }
    }

    onHandleChange(event) {
        this.pageSize = event.target.value;
        this.value = event.detail.value;
        this.totalPage = Math.ceil(this.totalRecordCount / this.pageSize);
        this.getContactList();
    }

    handleFirst(event) {
        this.hidePrevious=true;
        this.defaultSetting();
    }
    handlePrevious(event){
        if (this.page > 1){
            this.page = this.page - 1; 
            if(this.page==1){
                this.hidePrevious=true;
            }
            this.hideNext=false;
            this.displayRecordPerPage(this.page);
        }
    }
    
    handleNext(event){
        console.log('hy');
        if((this.page<this.totalPage) && this.page !== this.totalPage){
            console.log('next');
            this.page = this.page + 1;
            this.hidePrevious=false;
            if(this.page==this.totalPage){
                this.hideNext=true;
            }
            this.displayRecordPerPage(this.page);            
        }  
        
    }
    handleLast(event){
        this.page=this.totalPage;
        this.hideNext=true;
        this.hidePrevious=false;
        this.displayRecordPerPage(this.page);
    }
    
    displayRecordPerPage(page){
        this.startingRecord = ((page -1) * this.pageSize) ;
        this.endingRecord = (this.pageSize * page);
        this.endingRecord = (this.endingRecord > this.totalRecountCount) 
                            ? this.totalRecountCount : this.endingRecord; 
        this.dataList = this.outcomeList.slice(this.startingRecord, this.endingRecord);
        this.startingRecord = this.startingRecord + 1;
    }    
    handleEdit(event){
        this.conId = event.target.name;
        this.isOpenModal = true;
    }
    @track isOpenModal = false;
 
   
   
    handleCloseModal() {
        this.isOpenModal = false;
    }
    handleUpdate(){
        this.isOpenModal = false;
    }
    }

}
