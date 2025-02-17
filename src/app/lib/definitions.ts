export type PostData = {
    id: string;
    title: string;
    content: string;
    category: string;
    time: string;
    hidden: boolean;
    fileNameOne: string;
    fileNameTwo: string;
    fileNameThree: string;
    fileNameFour: string;
}

export type PostDataSimple = {
    
    id: string;
    title: string;
    content: string;
    category: string;
    time: Date;
    fileNameOne: string;
    fileNameTwo: string;
    fileNameThree: string;
    fileNameFour: string;
}

