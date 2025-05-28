export interface ClientResponse {
    _id:         string;
    firstName:   string;
    lastName:    string;
    email:       string;
    phone:       string;
    address:     string;
    age:         number;
    gender:      string;
    healthNotes: string[];
    startDate:   Date;
    status:      string;
    coachId:     string;
    __v:         number;
}
