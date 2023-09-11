import EventInterface from "../../@shared/event/event.interface";

export default class CustomerCreatedEvent implements EventInterface {
    private _dataTimeOccurred: Date;
    private _eventData: any;    
    
    constructor(eventData: any) {
        this._dataTimeOccurred = new Date();
        this._eventData = eventData;
    }  

    get dataTimeOccurred(): Date {
        return this._dataTimeOccurred;
    }
    get eventData(): any {
        return this._eventData;
    }
    
}