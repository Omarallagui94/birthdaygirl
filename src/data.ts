export type Memory={id:number;title:string;category:string;date:string;location:string;badge?:string;message:string;image:string;wide?:boolean}

export const memories:Memory[]=[
 {id:1,image:'/images/memories/memory-01.jpg',title:'The Beginning',date:'Five years ago',category:'Our Story',location:'The Lac',badge:'WHERE IT BEGAN',message:'Our very first picture together, taken at the Lac on your birthday five years ago. We did not know it yet, but this was the first frame of our story.',wide:true},
 {id:2,image:'/images/memories/memory-02.jpg',title:'Golden Smiles',date:'July 2023',category:'Favorite Places',location:'Marriott Rooftop',badge:'FAVORITE',message:'One of the best places we ever visited together—the Marriott rooftop. The view was beautiful, but sharing it with you made it unforgettable.'},
 {id:3,image:'/images/memories/memory-03.jpg',title:"Nadia’s Wedding",date:'March 2025',category:'Family Episodes',location:"Nadia’s wedding",message:'Your sister’s wedding was a beautiful celebration, and it was also the first time I met your family. It became an important chapter in our story.',wide:true},
 {id:4,image:'/images/memories/memory-04.jpg',title:'After Hours',date:'March 2025',category:'Little Moments',location:'The escalator',message:'A picture of us kissing in my favorite place—the escalator. Somehow, even the most ordinary place becomes special when I am there with you.'},
 {id:5,image:'/images/memories/memory-05.jpg',title:'New Beginning',date:'May 2025',category:'Our Story',location:'REPLACE: Add location',badge:'NEW CHAPTER',message:'Our first picture after overcoming a very difficult problem in our relationship. It reminds me that we chose each other and found a new beginning.'},
 {id:6,image:'/images/memories/memory-06.jpg',title:'Summer Energy',date:'Summer 2025',category:'Everyday Adventures',location:'Our internship days',message:'Last summer, we shared an internship and ended our evenings together at a coffee shop. Those simple routines became some of my favorite memories.',wide:true},
 {id:7,image:'/images/memories/memory-07.jpg',title:'Main Character Mood',date:'Her birthday · 2025',category:'Birthday Episodes',location:'REPLACE: Birthday location',badge:'BIRTHDAY FAVORITE',message:'Last year on your birthday, we enjoyed every moment and made the day completely ours. Your happiness made the whole celebration shine.'},
 {id:8,image:'/images/memories/memory-08.jpg',title:'Another Angle',date:'Her birthday · 2025',category:'Birthday Episodes',location:'REPLACE: Birthday location',message:'Another view of the same beautiful birthday chapter. One picture could never hold all the happiness we felt that day.'},
 {id:9,image:'/images/memories/memory-09.jpg',title:'Sunshine Scene',date:'August 2025',category:'Main Character Moments',location:'The beach',message:'One of my favorite pictures of you at the beach. You looked peaceful, beautiful, and completely at home beside the sea.',wide:true},
 {id:11,image:'/images/memories/memory-11.jpg',title:'Little Things',date:'October 2025',category:'Creative Moments',location:'Made with AI',message:'One of the pictures you created with AI. I love it because your creativity can turn even an imagined moment into something worth keeping.'},
 {id:12,image:'/images/memories/memory-12.jpg',title:'Winter Arc',date:'October 2025',category:'Training Together',location:'The gym',badge:'STRONGER TOGETHER',message:'Our winter arc, when we trained together at the gym. Every session was better because we were pushing forward side by side.',wide:true},
 {id:13,image:'/images/memories/memory-13.jpg',title:'November Glow',date:'November 2025',category:'Simple Moments',location:'Lac 0',badge:'TOP MEMORY',message:'Our best picture, taken at Lac 0 during a quiet evening. It reminds me that the simplest moments often become the strongest memories.'},
 {id:16,image:'/images/memories/memory-16.jpg',title:'New Year, Same Star',date:'January 2026',category:'Toyota Chronicles',location:'The Toyota',message:'One of the thousands of pictures of us inside the Toyota—the car that lived through nearly every situation in our relationship with us.',wide:true},
 {id:18,image:'/images/memories/memory-18.jpg',title:'Picture Perfect',date:'February 2026',category:'Family Episodes',location:'Paris',message:'A picture from when you went to Paris for your sister’s wedding. A beautiful city, a family celebration, and another unforgettable chapter.'},
 {id:19,image:'/images/memories/memory-19.jpg',title:'Late Night Stories',date:'May 2026',category:'Everyday Adventures',location:'REPLACE: Add location',message:'One of those quiet moments that became part of our story without even trying. With you, ordinary days always leave something worth remembering.'},
 {id:21,image:'/images/memories/memory-21.jpg',title:'Always There',date:'July 2026',category:'Our Story',location:'Together again',badge:'FOREVER GRATEFUL',message:'A picture of us after my illness. You waited, supported me, and stayed beside me until I was well again—I will always be grateful for you.',wide:true},
 {id:22,image:'/images/memories/memory-22.jpg',title:'Poster Moment',date:'Her birthday · 2025',category:'Birthday Episodes',location:'Last year’s birthday place',message:'The place we visited for your birthday last year. It holds the memory of a day filled with celebration, laughter, and you.'},
 {id:23,image:'/images/memories/memory-23.jpg',title:'Original Poster',date:'REPLACE: Date',category:'Main Character Moments',location:'REPLACE: Add location',message:'A portrait made for the main character of this story. Every chapter feels brighter when you are at its center.'},
 {id:24,image:'/images/memories/memory-24.jpg',title:'A Message Worth Keeping',date:'Last week',category:'New Beginnings',location:'Graduation day',badge:'NEW',message:'A picture of us last week, when you finally graduated and became an engineer. I am so proud of everything you worked for and the woman you have become.',wide:true}
];

export const rows=[
 ['Our Story',[1,5,16,21,24]],
 ['Birthday Episodes',[7,8,22,3]],
 ['Favorite Places & Moments',[2,4,9,13,18]],
 ['Everyday Adventures',[6,11,12,19,23]]
];

export const messages=[
 {name:'REPLACE: Best Friend',role:'Best friend · Co-star',text:'You make life lighter, louder, and infinitely more fun. Here’s to your best season yet.'},
 {name:'REPLACE: Mum',role:'Family · Executive producer',text:'Watching you become who you are has been the greatest story of my life. Happy birthday, my love.'},
 {name:'REPLACE: Sibling',role:'Family · Original cast',text:'No matter how many seasons pass, I’ll always be in your corner—and stealing your snacks.'}
];
