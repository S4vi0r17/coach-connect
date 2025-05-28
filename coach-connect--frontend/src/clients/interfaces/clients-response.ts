export interface ClientsResponse {
    _id:         string;
    firstName:   string;
    lastName:    string;
    email:       string;
    phone:       string;
    age:         number;
    gender:      string;
    healthNotes: string[];
    startDate:   Date;
    status:      string;
    coachId:     string;
    __v:         number;
}
