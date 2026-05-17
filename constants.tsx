
import { Course, BlogPost } from './types';

export const COURSES: Course[] = [
  {
    id: 'class-6',
    title: 'ষষ্ঠ শ্রেণি: ইংরেজি গ্রামার ও রাইটিং',
    description: 'ষষ্ঠ শ্রেণির ইংরেজি সিলেবাস অনুযায়ী গ্রামার এবং রাইটিং এর পূর্ণাঙ্গ প্রস্তুতি।',
    instructor: 'মাসুদ স্যার',
    price: 0,
    isFree: true,
    level: 'Beginner',
    thumbnail: 'https://placehold.co/800x450/1e40af/ffffff?text=Class+6+English',
    duration: '৪ মাস',
    category: 'Class 6',
    enrolledStudents: 450,
    modules: []
  },
  {
    id: 'class-7',
    title: 'সপ্তম শ্রেণি: ইংরেজি গ্রামার ও রাইটিং',
    description: 'সপ্তম শ্রেণির শিক্ষার্থীদের জন্য সহজ ও সাবলীল উপায়ে ইংরেজি ক্লাসের বিশেষ আয়োজন।',
    instructor: 'মাসুদ স্যার',
    price: 600,
    isFree: false,
    level: 'Beginner',
    thumbnail: 'https://placehold.co/800x450/4338ca/ffffff?text=Class+7+English',
    duration: '৪ মাস',
    category: 'Class 7',
    enrolledStudents: 520,
    modules: []
  },
  {
    id: 'class-8',
    title: 'অষ্টম শ্রেণি: ইংরেজি (JSC Preparation)',
    description: 'বেসিক গ্রামার থেকে শুরু করে পরীক্ষার জন্য সব বিষয়ের পূর্ণাঙ্গ গাইডলাইন।',
    instructor: 'মাসুদ স্যার',
    price: 0,
    isFree: true,
    level: 'Intermediate',
    thumbnail: 'https://placehold.co/800x450/1d4ed8/ffffff?text=Class+8+English',
    duration: '৫ মাস',
    category: 'Class 8',
    enrolledStudents: 890,
    modules: []
  },
  {
    id: 'class-9',
    title: 'নবম শ্রেণি: অ্যাডভান্সড গ্রামার ও রাইটিং',
    description: 'নবম শ্রেণির শিক্ষার্থীদের জন্য সৃজনশীল রাইটিং এবং গ্রামারের বিষদ আলোচনা।',
    instructor: 'মাসুদ স্যার',
    price: 800,
    isFree: false,
    level: 'Intermediate',
    thumbnail: 'https://placehold.co/800x450/2563eb/ffffff?text=Class+9+English',
    duration: '৬ মাস',
    category: 'Class 9',
    enrolledStudents: 670,
    modules: []
  },
  {
    id: 'class-10',
    title: 'দশম শ্রেণি: SSC English Full Course',
    description: 'SSC পরীক্ষার জন্য ১০০% প্রস্তুতির গ্যারান্টি। সব বিষয়ের সাজেশন ও ক্লাস টেস্ট।',
    instructor: 'মাসুদ স্যার',
    price: 1000,
    isFree: false,
    level: 'Advanced',
    thumbnail: 'https://placehold.co/800x450/3b82f6/ffffff?text=Class+10+English',
    duration: '৬ মাস',
    category: 'SSC Phase',
    enrolledStudents: 1200,
    modules: []
  },
  {
    id: 'class-11',
    title: 'একাদশ শ্রেণি: HSC English 1st & 2nd Paper',
    description: 'HSC ইংরেজি প্রথম ও দ্বিতীয় পত্রের সব টপিকের উপর বিশেষ গুরুত্ব দিয়ে সাজানো কোর্স।',
    instructor: 'মাসুদ স্যার',
    price: 1200,
    isFree: false,
    level: 'Advanced',
    thumbnail: 'https://placehold.co/800x450/60a5fa/ffffff?text=HSC+1st+Year',
    duration: '৮ মাস',
    category: 'HSC Phase',
    enrolledStudents: 780,
    modules: []
  },
  {
    id: 'class-12',
    title: 'দ্বাদশ শ্রেণি: HSC English Final Preparation',
    description: 'HSC ফাইনাল পরীক্ষার চূড়ান্ত প্রস্তুতি এবং টেস্ট পেপার সলভিং ক্লাস।',
    instructor: 'মাসুদ স্যার',
    price: 1500,
    isFree: false,
    level: 'Advanced',
    thumbnail: 'https://placehold.co/800x450/93c5fd/ffffff?text=HSC+Final',
    duration: '৬ মাস',
    category: 'HSC Phase',
    enrolledStudents: 950,
    modules: []
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'স্পোকেন ইংলিশে ১০টি সাধারণ ভুল',
    excerpt: 'নেটিভ স্পিকারদের মতো ইংরেজি বলতে এই ভুলগুলো আজই শুধরে নিন।',
    category: 'পরামর্শ',
    author: 'মাসুদ স্যার',
    date: '১২ অক্টোবর, ২০২৪',
    image: 'https://picsum.photos/seed/blog1/400/250'
  },
  {
    id: 'b2',
    title: 'দ্রুত শব্দভাণ্ডার বা ভোকাবুলারি বাড়ানোর উপায়',
    excerpt: 'প্রতিদিন ২০টি নতুন শব্দ শেখার ও মনে রাখার গোপন কৌশল।',
    category: 'লেসন',
    author: 'মাসুদ স্যার',
    date: '১৫ অক্টোবর, ২০২৪',
    image: 'https://picsum.photos/seed/blog2/400/250'
  }
];
