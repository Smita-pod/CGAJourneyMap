import React, { useState } from 'react';
import { ChevronDown, Eye, EyeOff } from 'lucide-react';

const CGAJourneyMap = () => {
  const [activeStage, setActiveStage] = useState('all');
  const [showPainPoints, setShowPainPoints] = useState(true);
  const [showOpportunities, setShowOpportunities] = useState(true);
  const [selectedDepartments, setSelectedDepartments] = useState(['all']);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [highlightedStep, setHighlightedStep] = useState(null);
  const [showResources, setShowResources] = useState(true);

  const cgaDepartments = [
    'All Departments',
    'Marketing',
    'Admissions',
    'Operations & SET',
    'Academics',
    'Community',
    'University'
  ];

  const handleDepartmentToggle = (dept) => {
    const deptValue = dept === 'All Departments' ? 'all' : dept;
    
    if (deptValue === 'all') {
      setSelectedDepartments(['all']);
    } else {
      setSelectedDepartments(prev => {
        const newSelection = prev.filter(d => d !== 'all');
        if (newSelection.includes(deptValue)) {
          const updated = newSelection.filter(d => d !== deptValue);
          return updated.length === 0 ? ['all'] : updated;
        } else {
          return [...newSelection, deptValue];
        }
      });
    }
  };

  const getSelectedDepartmentsDisplay = () => {
    if (selectedDepartments.includes('all')) {
      return 'All Departments';
    }
    if (selectedDepartments.length === 1) {
      return selectedDepartments[0];
    }
    return `${selectedDepartments.length} departments selected`;
  };

  const stepDepartmentMapping = {
    'pre-enrollment': {
      'Learning and Awareness': ['Student', 'Resources', 'Marketing'],
      'Enquiry & Info gathering': ['Student', 'Resources', 'Marketing', 'Admissions'],
      'Admissions Consultation Phase': ['Student', 'Resources', 'Admissions', 'Academics'],
      'Enrollment & Course selection': ['Student', 'Resources', 'Admissions', 'Operations & SET', 'Academics']
    },
    'active': {
      'Getting Started / Onboarding': ['Student', 'Resources', 'Operations & SET', 'Academics', 'Admissions', 'Community'],
      'Learning Experience': ['Student', 'Resources', 'Academics', 'Community', 'Operations & SET'],
      'Extracurricular and Social life': ['Student', 'Resources', 'Community', 'Academics', 'Operations & SET'],
      'Ongoing Support': ['Student', 'Resources', 'Operations & SET', 'Academics'],
      'Assessments': ['Student', 'Resources', 'Academics'],
      'External exam preparations': ['Student', 'Resources', 'Academics', 'Operations & SET'],
      'Re-enrollment': ['Student', 'Resources', 'Admissions', 'Academics']
    },
    'post-graduate': {
      'University Applications': ['Student', 'Resources', 'Academics', 'University', 'Admissions', 'Marketing'],
      'Graduation & Beyond': ['Student', 'Resources', 'Academics', 'University', 'Community', 'Admissions'],
      'Alumni Engagement': ['Student', 'Resources', 'Community', 'Academics']
    }
  };

  const getDepartmentColor = (dept) => {
    const colors = {
      'Student': 'border-blue-400 bg-blue-50',
      'Resources': 'border-purple-400 bg-purple-50',
      'Marketing': 'border-red-400 bg-red-50',
      'Admissions': 'border-pink-400 bg-pink-50',
      'Operations & SET': 'border-orange-400 bg-orange-50',
      'Academics': 'border-green-400 bg-green-50',
      'Community': 'border-indigo-400 bg-indigo-50',
      'University': 'border-teal-400 bg-teal-50'
    };
    return colors[dept] || 'border-gray-400 bg-gray-50';
  };

  const getDepartmentIcon = (dept) => {
    const icons = {
      'Marketing': '📢',
      'Admissions': '🎯',
      'Operations & SET': '⚙️',
      'Academics': '🎓',
      'Community': '👥',
      'University': '🏛️'
    };
    return icons[dept] || '📋';
  };

  const isStepHighlighted = (step) => {
    return highlightedStep === step;
  };

  const isDepartmentHighlighted = (dept, step) => {
    if (!highlightedStep) return false;
    let stage = 'active';
    if (activeStage === 'pre-enrollment') stage = 'pre-enrollment';
    else if (activeStage === 'post-graduate') stage = 'post-graduate';
    const depts = stepDepartmentMapping[stage] && stepDepartmentMapping[stage][step] ? stepDepartmentMapping[stage][step] : [];
    return depts.includes(dept);
  };

  const shouldShowCGADepartment = (dept) => {
    return selectedDepartments.includes('all') || selectedDepartments.includes(dept);
  };

  const shouldShowStage = (stage) => {
    return activeStage === 'all' || activeStage === stage;
  };

  const journeySteps = {
    'pre-enrollment': [
      {
        title: 'Learning and Awareness',
        student: [
          'Discovers CGA through various channels',
          'Explores website and resources',
          'Attends webinars',
          'Asks initial questions'
        ],
        resources: [
          'Marketing Channels: SEO, social media, webinars, email',
          'Website with testimonials',
          'Webinar Information pages',
          'School prospectus/brochure',
          'Video tours',
          'Digital Open House content'
        ],
        departments: {
          'Marketing': [
            {
              title: 'Marketing Team (Global)',
              items: [
                'Manages website content and SEO optimization',
                'Runs social media channels and campaigns',
                'Produces informational materials and prospectus',
                'Organizes webinars and virtual open houses',
                'Manages school rankings and PR coverage'
              ]
            },
            {
              title: 'Regional Digital Marketers',
              items: [
                'Create region-specific marketing campaigns',
                'Adapts and localizes marketing materials',
                'Adapt global content for local markets',
                'Manage paid search and social campaigns'
              ]
            }
          ],
          'Admissions': [
            {
              title: 'Growth Team',
              items: [
                'Oversees marketing strategy alignment with enrollment goals',
                'Sets positioning strategy for different regions',
                'Ensures marketing claims align with academic reality',
                'Localization of global resources and content',
                'Executes local strategies'
              ]
            }
          ],
          'Community': [
            {
              title: 'Community Team',
              items: [
                'Handles testimonials, alumni spotlights, social media'
              ]
            }
          ]
        }
      },
      {
        title: 'Enquiry & Info gathering',
        student: [
          'Discusses educational needs and goals',
          'Explores curriculum options',
          'Compares with other schools',
          'Asks detailed questions about courses',
          'Tries sample classes (Da Vinci)',
          'Evaluates if online learning is right for them'
        ],
        resources: [
          'Course Selection/Pathway Information: Detailed descriptions of subjects',
          'Academic Calendar/Timetable Planner',
          'Admissions Consultation Booking System'
        ],
        departments: {
          'Marketing': [
            {
              title: 'Marketing Team',
              items: [
                'Manages nurture email campaigns for leads not immediately converting',
                'Provides resources and content for continued engagement'
              ]
            }
          ],
          'Admissions': [
            {
              title: 'SDR (Sales Development Representative)',
              items: [
                'Makes first contact via phone, email, or SMS',
                'Qualifies leads based on fit and ability to pay',
                'Books initial consultations for qualified leads'
              ]
            },
            {
              title: 'Admissions Officers',
              items: [
                'Reviews inquiry information',
                'Prepares for initial consultation',
                'Coordinates with regional teams',
                'Prepares personalized information based on inquiry details',
                'Assist students in choosing the right courses and provide personalized experiences'
              ]
            }
          ]
        }
      },
      {
        title: 'Admissions Consultation Phase',
        student: [
          'Attend 1-2 consultation meetings (Zoom)',
          'Share academic goals and background',
          'Submit previous academic records/transcripts',
          'Complete English proficiency assessment (if non-native)',
          'Participate in private conversation with admissions officer',
          'Take admissions assessment tests',
          'Discuss subject/course preferences',
          'For Da Vinci students: participate in trial classes',
          'Share special educational needs information',
          'Discuss schedule preferences/constraints'
        ],
        resources: [
          'Dedicated Academic Calendar/Planner Access',
          'Enrollment Form: Includes PowerSchool entry to track applications through the portal',
          'Summary of Da Vinci vs. Regular Classroom Processes',
          'Link Calculators',
          'SEN Accommodation Forms: For families, including policy details',
          'Access to Student Feedback and Success Stories'
        ],
        departments: {
          'Admissions': [
            {
              title: 'Admissions Officers',
              items: [
                'Conduct consultations (1-2 meetings)',
                'Assess student English proficiency',
                'Have private conversations with students to gauge motivation',
                'Review academic records and make initial course recommendations',
                'Explain program options (group vs. Da Vinci, A-levels vs. USDP)',
                'Organize trial classes for Da Vinci students',
                'Complete all credit transfer documents and fill in the student\'s planner (USDP)',
                'Create academic plans aligned with university goals',
                'Seek approval for student plans (if necessary) from relevant academic teams (Deans, University Admissions)'
              ]
            }
          ],
          'Academics': [
            {
              title: 'Academic Team (for pre-approval)',
              items: [
                'Reviews complex cases and special requests',
                'Provides guidance on academic readiness',
                'Evaluates prerequisite knowledge for courses',
                'Pre-approved course selections'
              ]
            },
            {
              title: 'Campus-specific SEND Coordinator',
              items: [
                'Meets with students who have special educational needs',
                'Assesses access arrangements',
                'Determines support capabilities'
              ]
            }
          ]
        }
      },
      {
        title: 'Enrollment & Course selection',
        student: [
          'Complete enrollment forms',
          'Make payment arrangements',
          'Select courses with guidance',
          'Create academic plans aligned with goals',
          'Schedule classes',
          'Prepare necessary documentation'
        ],
        resources: [
          'Timetable Planner (with AOs)',
          'Enrollment Form',
          'T&Cs and other guides (in the enrollment form)'
        ],
        departments: {
          'Admissions': [
            {
              title: 'Admissions Team',
              items: [
                'Guides through PowerSchool application process',
                'Confirms course selections and creates schedule',
                'Switches lead status in Salesforce once enrolled',
                'Documents student background in PowerSchool notes',
                'Provides Da Vinci availability information to operations team',
                'Directs students to schedule onboarding session with SET, ensuring that they have scheduled'
              ]
            },
            {
              title: 'Accounts team',
              items: [
                'Processes initial payments',
                'Sets up recurring payment arrangements',
                'Issues receipts'
              ]
            }
          ],
          'Academics': [
            {
              title: 'Academic team (Deans)',
              items: [
                'Finalize course approval for students who required pre-approval and late joiners for group classes',
                'Confirms class placements'
              ]
            }
          ]
        }
      }
    ],
    'active': [
      {
        title: 'Getting Started / Onboarding',
        student: [
          'Receives welcome communications',
          'Sets up accounts/technology',
          'Create required accounts (CGA Home, Canvas, etc.)',
          'Attends orientation sessions',
          'Meets teachers and classmates',
          'Learns how to navigate platforms',
          'Joins house/form groups',
          'Feels overwhelmed with multiple platforms',
          'Gets familiar with expectations'
        ],
        resources: [
          'Welcome Email: Google account signup',
          'CGA Home Portal',
          'Academic Calendar',
          'Student Induction Course: Links to academic requirements, pastoral support, and tech guides',
          'Orientation Schedules',
          'Video Tutorials/Guides',
          'Class Timetables',
          'Access to Canvas',
          'Zoom',
          'Teams',
          'Parent Portal Setup'
        ],
        departments: {
          'Operations & SET': [
            {
              title: 'Student Experience Team',
              items: [
                'Guides students through the enrollment',
                'Sends welcome emails with login information (within 24 hours of a new-won deal notification)',
                'Introduces themselves as the student and family\'s primary point of contact',
                'Conducts daily orientation sessions',
                'Provides technical support for account setup',
                'Helps with Zoom access and platform navigation',
                'Responds to initial queries',
                'Provides translation services when needed',
                'Assigns students to appropriate campus',
                'Creates necessary accounts',
                'Adds students to class rosters',
                'For Da Vinci: works on teacher allocation'
              ]
            }
          ],
          'Academics': [
            {
              title: 'Academic Team (Deans, form teachers)',
              items: [
                'Assigns form teachers',
                'Meets with late-enrolling students',
                'Plans first form time/homeroom session',
                'Prepares welcome information for houses',
                'Coordinates induction days activities'
              ]
            }
          ],
          'Admissions': [
            {
              title: 'Admissions Team',
              items: [
                'Make sure AAs are checking in with students within the initial 2 week period'
              ]
            }
          ]
        }
      },
      {
        title: 'Learning Experience',
        student: [
          'Attends live classes',
          'Submits assignments',
          'Participates in discussions',
          'Receives feedback',
          'Builds relationships with teachers',
          'Adjusts to online learning environment',
          'Manages time across time zones',
          'Use various learning platforms',
          'Set up study space and routines',
          'Deals with technical issues',
          'Experiences both synchronous and asynchronous learning',
          'Parents: monitor initial progress and engagement'
        ],
        resources: [
          'CGA Home',
          'Recorded classes',
          'Canvas',
          'OneNote',
          'Learning resources',
          'Canvas course material',
          'Study guide',
          'Library resources',
          'Class materials',
          'Practice questions',
          'Reports: Academic progress tracking tools',
          'Pastoral care resources',
          'Feedback forms',
          'Parent-teacher conference scheduling system',
          'Zoom',
          'Teams',
          'Interactive Platform (Discussion threads, group projects, and forums)'
        ],
        departments: {
          'Academics': [
            {
              title: 'Academic Team Teachers',
              items: [
                'Deliver live classes',
                'Provide course materials and assignments',
                'Grade student work',
                'Offer feedback and academic support',
                'Flag attendance or participation concerns',
                'Communicate directly with students and parents'
              ]
            },
            {
              title: 'Form Teachers',
              items: [
                'Run regular form time sessions',
                'Provide initial pastoral support',
                'Monitor attendance and engagement',
                'Serve as first point of contact for issues'
              ]
            },
            {
              title: 'Heads of Departments',
              items: [
                'Oversee curriculum delivery',
                'Support teachers with resources',
                'Address subject-specific concerns'
              ]
            },
            {
              title: 'Deans',
              items: [
                'Run house assemblies',
                'Oversee form teachers',
                'Provide resources for pastoral curriculum',
                'Escalate concerns when needed'
              ]
            }
          ],
          'Community': [
            {
              title: 'Community Team',
              items: [
                'House leaders: Organize extracurricular activities for students',
                'SENCO for students needing accommodations',
                'Community team: Provides pastoral support'
              ]
            }
          ],
          'Operations & SET': [
            {
              title: 'IT/Helpdesk',
              items: [
                'Help resolve IT-specific issues, such as resetting passwords'
              ]
            }
          ]
        }
      },
      {
        title: 'Extracurricular and Social life',
        student: [
          'Joins clubs and activities',
          'Participates in house events',
          'Attends virtually organised activities',
          'Develops social connections',
          'Builds community connections',
          'Takes on leadership roles',
          'Feels connected despite physical distance'
        ],
        resources: [
          'CGA Home Announcements',
          'Faculty and Clubs: CGA Clubs, Houses, and events',
          'Chat/Discussion boards',
          '"Tech Support": SIS assistance for technical issues',
          'Student services',
          'Parent portal',
          'CGA Friends',
          'CGA Classrooms'
        ],
        departments: {
          'Community': [
            {
              title: 'Community Team',
              items: [
                'Organizes in-person and virtual meetups',
                'Manages school newsletter',
                'Coordinates special events and celebrations',
                'Develops and runs school traditions',
                'Supports student clubs'
              ]
            },
            {
              title: 'Student Leadership Coordinators',
              items: [
                'Manage NHS (National Honor Society) program',
                'Meet monthly with student leaders',
                'Support assembly planning',
                'Provide guidance for student initiatives'
              ]
            },
            {
              title: 'SEN Coordinator',
              items: [
                'Implements accommodation plans',
                'Coordinates with teachers on modifications',
                'Provides ongoing support to SEN students'
              ]
            }
          ],
          'Academics': [
            {
              title: 'Deans',
              items: [
                'Oversee house system activities',
                'Support student leadership teams',
                'Facilitate house meetings and competitions'
              ]
            },
            {
              title: 'Life Program Coordinator (AL Pathway only)',
              items: [
                'Runs Life Program activities',
                'Focuses on holistic student development'
              ]
            }
          ],
          'Operations & SET': [
            {
              title: 'Student Experience Team',
              items: [
                'Manages student inquiries and provides online help',
                'Resolves basic technical issues'
              ]
            }
          ]
        }
      },
      {
        title: 'Ongoing Support',
        student: [
          'Receives help when needed',
          'Communicates with teachers/staff',
          'Accesses academic services',
          'Gets pastoral care',
          'Uses technical support resources',
          'Navigates health/wellbeing challenges',
          'Accesses accommodations if needed',
          'Receives additional support if struggling',
          'For SEN students: participate in accommodation planning'
        ],
        resources: [
          'Student Experience Team: Dedicated team members and online FAQs',
          'CGA Home contact us page',
          'Tech Support: For IT, SIS, and Zoom Guidance',
          'Parent portal',
          'Teacher office hours',
          'Pastoral support resources',
          'Academic intervention resources'
        ],
        departments: {
          'Operations & SET': [
            {
              title: 'Student Experience Team',
              items: [
                'Responding to student during normal business hours',
                'Provides ongoing technical support',
                'Helps resolve technical issues affecting students and staff/parents',
                'Monitors student wellbeing indicators',
                'Provides academic support when needed',
                'Receives feedback from students and families',
                'Coordinates with other departments for student support',
                'Reporting systems'
              ]
            },
            {
              title: 'SEN Coordinator',
              items: [
                'Communicates with teachers on modifications',
                'Provides ongoing support to SEN students'
              ]
            }
          ],
          'Academics': [
            {
              title: 'Academic Team',
              items: [
                'Provides academic support and guidance',
                'Monitors student academic progress',
                'Offers additional tutoring when needed',
                'Coordinates with teachers for student support'
              ]
            }
          ]
        }
      },
      {
        title: 'Assessments',
        student: [
          'Completes assessments',
          'Receives grades and feedback',
          'Reviews progress reports',
          'Attends parent-teacher conferences',
          'Discusses performance with teachers',
          'Parents: see parent portal to monitor progress',
          'Receives guidance on academic improvement',
          'Identifies areas for improvement',
          'Sets academic goals',
          'Prepares for external exams',
          'Feels pressure during exam periods'
        ],
        resources: [
          'Parent Portal-Student Insights',
          'CGA Home Feedback',
          'DV Course Details',
          'Term Reports',
          'Canvas and CGA Home: Assignments and Feedback',
          'SIS Transcripts',
          'Parent-Teacher meetings',
          'Ad-hoc meetings (1:1s)'
        ],
        departments: {
          'Academics': [
            {
              title: 'Academic Dean',
              items: [
                'Identifies and contacts at-risk students',
                'Monitors student academic performance and intervention',
                'Monitors key students',
                'Dean and Form Teachers coordination',
                'Contacts student about performance',
                'Contact parents about concerns',
                'Arrange and implement support plans'
              ]
            }
          ]
        }
      },
      {
        title: 'External exam preparations',
        student: [
          'Receives exam registration communications',
          'Attend sessions about exam processes',
          'Receives study guides, exam schedules, and the exam fees',
          'Completes exam registration for online exams',
          'Request special accommodations if needed',
          'Prepare home environment for online exams',
          'For offline exams: plan travel to exam centres',
          'Participate in exam preparation sessions'
        ],
        resources: [
          'Exam schedules',
          'Study resources',
          'Past papers',
          'Exam registration guides',
          'Exam techniques workshops',
          'Subject revision guides',
          'SIS Exam access arrangements'
        ],
        departments: {
          'Academics': [
            {
              title: 'Exams Team',
              items: [
                'Sends guidance announcement about exam sessions',
                'Collects student data (legal names, DOB, locations)',
                'Creates accommodations test administration',
                'Creates and distributes exam timetables',
                'Coordinates exams administration',
                'Support coursework timelines and instructions',
                'Supports students during examination period',
                'Creates session during exam weeks',
                'Provide subject-specific guidance',
                'Recommend appropriate course level',
                'Help students manage exam stress',
                'Ensure students understand procedures'
              ]
            }
          ],
          'Operations & SET': [
            {
              title: 'Student Experience Team',
              items: [
                'Provides technical support for online exams',
                'Assists with exam platform setup',
                'Monitors student technical needs during exam periods',
                'Coordinates with exam team for technical requirements'
              ]
            }
          ]
        }
      },
      {
        title: 'Re-enrollment',
        student: [
          'Attend subject selection consultations',
          'Discuss future academic plans with form teachers',
          'Reviews academic performance for next academic year',
          'Consider university/career implications of choices',
          'Complete re-enrollment forms',
          'Select courses for upcoming year',
          'Make payment arrangements for next year',
          'Updates contact and personal information',
          'Provide feedback on current year experience'
        ],
        resources: [
          'Course Catalog',
          'Course Planner',
          'Academic planner (set by AOs)',
          'Re-enrollment form'
        ],
        departments: {
          'Admissions': [
            {
              title: 'Operations Team',
              items: [
                'Coordinates re-enrollment',
                'Provides re-enrollment paperwork',
                'Updates student information in systems',
                'Creates confirmation emails',
                'Advises administrative questions about next year'
              ]
            }
          ],
          'Academics': [
            {
              title: 'Course and Form Teachers',
              items: [
                'Individual meeting about academic subject pathways',
                'Confirms course and appropriate course pathways',
                'Support students in making course decisions',
                'Confirm class formation',
                'Provides advice on academic route and potential outcomes',
                'Confirms subject-readiness for new courses',
                'Provide subject-specific guidance',
                'Recommend appropriate course level',
                'Create additional academic support for students'
              ]
            }
          ]
        }
      }
    ],
    'post-graduate': [
      {
        title: 'University Applications',
        student: [
          'Receives CGA guidance on university options of best fit around the world',
          'Decides on pathways, building application towards these goals',
          'Applies to universities and receives offers of admissions',
          'Participation in extracurricular activities and offerings at CGA'
        ],
        resources: [
          'University admissions webinars and content',
          'University application portals and platforms'
        ],
        departments: {
          'Academics': [
            {
              title: 'Academic Team',
              items: [
                'Writes letters of recommendation',
                'Supports university applications',
                'Provides subject-specific interview training'
              ]
            }
          ],
          'University': [
            {
              title: 'University Counselors',
              items: [
                'Deliver direct 1 on 1 advising to students and coordinates the creation and delivery of group based or self directed content'
              ]
            }
          ],
          'Admissions': [
            {
              title: 'Admissions Team',
              items: [
                'Supports university applications'
              ]
            }
          ],
          'Marketing': [
            {
              title: 'Marketing',
              items: [
                'Leverages alumni stories'
              ]
            }
          ]
        }
      },
      {
        title: 'Graduation & Beyond',
        student: [
          'Complete final assessments and exams',
          'Attend graduation events and ceremonies',
          'Receive and verify exam results',
          'Access and store certificates',
          'Apply to universities using CGA results',
          'Share university acceptances',
          'Parents: participate in graduation celebrations'
        ],
        resources: [
          'Graduation guide',
          'University application resources',
          'Career guidance',
          'Transcript request process',
          'Exit survey'
        ],
        departments: {
          'Academics': [
            {
              title: 'Academic Team',
              items: [
                'Confirms graduation eligibility',
                'Organizes graduation ceremonies',
                'Writes letters of recommendation',
                'Supports university applications'
              ]
            },
            {
              title: 'Exams Team',
              items: [
                'Distributes exam results',
                'Manages certificate delivery',
                'Supports post-exam services (remarks, appeals)',
                'Scans and sends certificates to students'
              ]
            }
          ],
          'University': [
            {
              title: 'University Counselors',
              items: [
                'Provide guidance on school choice and matriculation process',
                'Confirm school of matriculation',
                'Add student destination to database of graduates'
              ]
            }
          ],
          'Community': [
            {
              title: 'Community Team',
              items: [
                'Organizes graduation events',
                'Maintains connection with graduates',
                'Creates graduation celebrations'
              ]
            }
          ],
          'Admissions': [
            {
              title: 'Admissions Team',
              items: [
                'Conducts final check-in before graduation',
                'Solicits feedback on overall CGA experience',
                'Requests reviews and testimonials'
              ]
            }
          ]
        }
      },
      {
        title: 'Alumni Engagement',
        student: [
          'Maintains connection with CGA',
          'Shares experiences with current students',
          'Participates in alumni events',
          'Potentially returns as mentor',
          'Provide testimonials and success stories',
          'Receives ongoing support as needed',
          'Maintain connection with CGA community',
          'Join alumni community'
        ],
        resources: [
          'Alumni portal',
          'Virtual career/employment and networking events',
          'University support',
          'Professional networks',
          'Alumni newsletter'
        ],
        departments: {
          'Community': [
            {
              title: 'Community Team',
              items: [
                'Develops alumni engagement opportunities',
                'Collects success stories and testimonials'
              ]
            }
          ],
          'Academics': [
            {
              title: 'Academic Team',
              items: [
                'Provides references'
              ]
            }
          ]
        }
      }
    ]
  };

  const painPoints = {
    'Learning and Awareness': [
      'CGA often initially considered as a "Plan B" rather than first choice',
      'Greenwich campus has limited visibility in search results (UK market)',
      'Regional differences in awareness and understanding',
      'Marketing not always aligned with academic capabilities'
    ],
    'Enquiry & Info gathering': [
      'Low contact rates (many leads don\'t answer phones/emails)',
      'Limited understanding of what makes online learning successful',
      'Complex pricing structure (particularly US market)',
      'Different expectations between regions (especially Asian markets)'
    ],
    'Admissions Consultation Phase': [
      'Admissions testing not reliably predicting outcomes',
      'Limited academic team involvement in enrollment process',
      'Challenges identifying SEN students early'
    ],
    'Enrollment & Course selection': [
      'Time zone differences causing delays in communication',
      'Complex system interactions between Salesforce and PowerSchool',
      'Limited academic team involvement in pre-enrollment decisions',
      'Insufficient identification of SEN students early in the process',
      'Multiple platforms creating confusion',
      'Complex pricing structure',
      'Payment requirements delaying Da Vinci start dates'
    ],
    'Getting Started / Onboarding': [
      'Gap between enrollment and class start (anxiety/buyer\'s remorse)',
      'Multiple platforms causing confusion (Canvas, CGA Home, Crimson App)',
      'No tracking system for induction course completion',
      'Outdated videos in induction materials (from 2019-2020)',
      'Lack of formal handover meetings between admissions and operations',
      'No formal introduction to Academic Dean'
    ],
    'Learning Experience': [
      'Difficulty tracking academic progress across multiple platforms',
      'Inconsistent attendance tracking and enforcement',
      'Da Vinci program issues (missing grades, feedback)',
      'Adjustment challenges to online learning environment',
      'Unresponsive students/parents when academic issues arise',
      'Limited visibility for parents into Da Vinci progress'
    ],
    'Extracurricular and Social life': [
      'Limited informal student interactions compared to physical schools',
      'Scaling community support with limited team resources',
      'Low utilization of "corridor" social feature',
      'Geographic dispersion limiting in-person connections',
      'Confusion about who owns different aspects of community experience'
    ],
    'Ongoing Support': [],
    'Assessments': [],
    'External exam preparations': [
      'Manual processes (spreadsheets, emails)',
      'No centralized system for tracking exam information',
      'Complex, lengthy emails that students often don\'t read',
      'Separate invoicing for different exam sessions',
      'Limited visibility into Da Vinci students\' exam plans'
    ],
    'Re-enrollment': [
      'Divided focus for admissions team between new enrollments and re-enrollments',
      'Complex course selection process',
      'Balancing university goals with appropriate academic progression',
      'Transitions between academic levels (IG to AS)',
      'Inconsistent DV re-enrollment SOPs, particularly with pending examination scores'
    ],
    'University Applications': [],
    'Graduation & Beyond': [
      'No formal "final sendoff" or exit process',
      'Limited alumni engagement and community',
      'Students "disappear" after graduation',
      'No exit meetings with Academic Dean'
    ],
    'Alumni Engagement': []
  };

  const opportunities = {
    'Learning and Awareness': [
      'Improved coordination between marketing and academic teams',
      'Develop more region-specific marketing materials (especially UK)',
      'Better utilize UK-based teachers for marketing events',
      'Increase open days or similar showcase events'
    ],
    'Enquiry & Info gathering': [
      'Improve automated response systems (SMS capabilities)',
      'Develop more content about successful online learning traits',
      'Simplify pricing structure (e.g., standard tuition amount)',
      'Better qualification of leads before consultation booking'
    ],
    'Admissions Consultation Phase': [
      'Redesign admissions testing',
      'More structured pre-approval process',
      'Earlier identification of SEN students'
    ],
    'Enrollment & Course selection': [
      'Add formal application stage before enrollment',
      'Increase interactions between admissions officers and academic teams in order to build trust in enrollment decisions',
      'Increase academic team involvement in the enrollment process',
      'Improve SEN student identification and accommodation planning',
      'Better coordination between sales and academic teams',
      'Develop standardized tuition pricing',
      'Standardized tuition model',
      'Simplifying the enrollment process',
      'Better handling of student data between systems'
    ],
    'Getting Started / Onboarding': [
      'Create learning mode-specific induction content',
      'Implement formal handover meetings between departments',
      'Track induction course completion',
      'Develop clearer communication about platform usage',
      'Update orientation videos and materials',
      'Create a resource library for students that can be self-guided',
      'Establish formal meetings with Academic Dean for all new students'
    ],
    'Learning Experience': [
      'Implement unified student management system',
      'Improve attendance tracking procedures',
      'Increase academic oversight of Da Vinci teachers',
      'Develop "Thriving Sessions" to help students adjust to online learning',
      'Create automated alerts for at-risk students',
      'Improve parent portal features for Da Vinci program',
      'Increase parent engagement in child\'s educational journey'
    ],
    'Extracurricular and Social life': [
      'Expand Dean involvement in community meetups',
      'Establish parent chapter leaders for local meetups',
      'Better integration of community events into academic calendars',
      'Enhance "corridor" feature or create alternatives for social connection',
      'Develop more consistent regional meetups'
    ],
    'Ongoing Support': [],
    'Assessments': [],
    'External exam preparations': [
      'Dedicated "exams space" on CGA Home',
      'Better data access and management',
      'Automated fee calculation and payment',
      'Dashboard for students to see entries and timetables',
      'Improved guidance for first-time exam takers'
    ],
    'Re-enrollment': [
      'Consider dedicated re-enrollment staff (USDP-specific)',
      'Improve course selection guidance',
      'Create more resources for academic level transitions',
      'Better coordinate between admissions and academic teams',
      'Utilize academic planner tool more effectively'
    ],
    'University Applications': [],
    'Graduation & Beyond': [
      'Develop formal exit meetings with graduating students',
      'Create stronger alumni programming',
      'Establish alumni network for mentoring current students',
      'Better tracking of post-graduation outcomes',
      'Develop graduation traditions and ceremonies'
    ],
    'Alumni Engagement': []
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <div className="bg-purple-700 text-white p-4">
        <h1 className="text-2xl font-bold text-center">CGA Student Journey Map</h1>
        <p className="text-center text-purple-100 text-sm mt-1">Complete educational experience from discovery to career success</p>
      </div>

      <div className="bg-white shadow-sm p-4 border-b sticky top-0 z-20">
        <div className="max-w-full mx-auto flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveStage('all')}
              className={`px-4 py-2 rounded text-sm font-medium ${
                activeStage === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All Stages
            </button>
            <button
              onClick={() => setActiveStage('pre-enrollment')}
              className={`px-4 py-2 rounded text-sm font-medium ${
                activeStage === 'pre-enrollment' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Pre-Enrollment
            </button>
            <button
              onClick={() => setActiveStage('active')}
              className={`px-4 py-2 rounded text-sm font-medium ${
                activeStage === 'active' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setActiveStage('post-graduate')}
              className={`px-4 py-2 rounded text-sm font-medium ${
                activeStage === 'post-graduate' ? 'bg-yellow-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Post-Graduate
            </button>
          </div>

          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-white border rounded text-sm hover:bg-gray-50 min-w-48"
            >
              <span className="truncate">{getSelectedDepartmentsDisplay()}</span>
              <ChevronDown className="w-4 h-4 flex-shrink-0" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white border rounded shadow-lg z-30 max-h-64 overflow-y-auto">
                {cgaDepartments.map(dept => {
                  const deptValue = dept === 'All Departments' ? 'all' : dept;
                  const isSelected = selectedDepartments.includes(deptValue);
                  return (
                    <button
                      key={dept}
                      onClick={() => handleDepartmentToggle(dept)}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2 ${
                        isSelected ? 'bg-blue-50 text-blue-700' : ''
                      }`}
                    >
                      <div className={`w-4 h-4 border rounded flex items-center justify-center ${
                        isSelected ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
                      }`}>
                        {isSelected && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <span>{dept}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowResources(!showResources)}
              className={`flex items-center gap-2 px-3 py-2 rounded text-sm ${
                showResources ? 'bg-purple-100 text-purple-700' : 'bg-gray-200 text-gray-500'
              }`}
            >
              {showResources ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              Resources
            </button>
            <button
              onClick={() => setShowPainPoints(!showPainPoints)}
              className={`flex items-center gap-2 px-3 py-2 rounded text-sm ${
                showPainPoints ? 'bg-red-100 text-red-700' : 'bg-gray-200 text-gray-500'
              }`}
            >
              {showPainPoints ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              Pain Points
            </button>
            <button
              onClick={() => setShowOpportunities(!showOpportunities)}
              className={`flex items-center gap-2 px-3 py-2 rounded text-sm ${
                showOpportunities ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-200 text-gray-500'
              }`}
            >
              {showOpportunities ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              Opportunities
            </button>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="p-4">
          {highlightedStep && (
            <div className="mb-4 p-4 bg-white rounded-lg border-2 border-blue-300 shadow-md">
              <h3 className="font-bold text-lg text-blue-800 mb-2">
                📍 {highlightedStep} - Department Involvement
              </h3>
              <div className="flex flex-wrap gap-2">
                {stepDepartmentMapping[activeStage === 'pre-enrollment' ? 'pre-enrollment' : activeStage === 'post-graduate' ? 'post-graduate' : 'active'] && 
                  stepDepartmentMapping[activeStage === 'pre-enrollment' ? 'pre-enrollment' : activeStage === 'post-graduate' ? 'post-graduate' : 'active'][highlightedStep] &&
                  stepDepartmentMapping[activeStage === 'pre-enrollment' ? 'pre-enrollment' : activeStage === 'post-graduate' ? 'post-graduate' : 'active'][highlightedStep].map(dept => (
                    <span key={dept} className={`px-3 py-1 rounded-full text-xs font-medium border-2 ${getDepartmentColor(dept)}`}>
                      {dept}
                    </span>
                  ))
                }
              </div>
              <button 
                onClick={() => setHighlightedStep(null)}
                className="mt-2 text-sm text-blue-600 hover:text-blue-800"
              >
                Clear Highlighting
              </button>
            </div>
          )}

          {shouldShowStage('pre-enrollment') && (
            <div className="mb-8">
              <div className="text-center mb-6 bg-blue-100 p-4 rounded-lg border-t-4 border-blue-600">
                <h2 className="font-bold text-2xl text-gray-800">🎯 Pre-Enrollment Stage</h2>
                <p className="text-gray-600">Discovery & Decision</p>
              </div>
              
              <div className="flex gap-4 w-full">
                {journeySteps['pre-enrollment'].map((step, stepIdx) => (
                  <div key={stepIdx} className="flex-1 flex flex-col">
                    <div 
                      className={`text-center mb-4 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                        isStepHighlighted(step.title) ? 'bg-yellow-200 ring-2 ring-yellow-400' : 'bg-indigo-50 hover:bg-indigo-100'
                      }`}
                      onClick={() => setHighlightedStep(isStepHighlighted(step.title) ? null : step.title)}
                    >
                      <div className="flex items-center justify-center mb-2">
                        <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {stepIdx + 1}
                        </div>
                      </div>
                      <h3 className="font-bold text-indigo-800 text-sm">{step.title}</h3>
                      <p className="text-xs text-gray-600 mt-1">👆 Click to highlight departments</p>
                    </div>

                    <div className="flex-1 flex flex-col">
                      <div className="bg-indigo-100 p-4 rounded-lg border-t-4 border-indigo-600 flex-grow mb-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                          </div>
                          <h4 className="font-bold text-indigo-800 text-lg">Student Experience</h4>
                        </div>
                        
                        <div className="bg-white rounded-lg p-3 shadow-sm mb-3">
                          <h5 className="font-semibold text-indigo-700 text-sm mb-2">Student Actions</h5>
                          <ul className="text-sm text-gray-700 space-y-2">
                            {step.student.map((item, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="w-2 h-2 bg-indigo-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {showResources && (
                          <div className={`bg-white rounded-lg p-3 shadow-sm transition-all duration-300 ${isDepartmentHighlighted('Resources', step.title) ? 'ring-2 ring-gray-400' : ''}`}>
                            <h5 className="font-semibold text-gray-700 text-sm mb-2">Systems & Resources</h5>
                            {step.resources.length > 0 ? (
                              <ul className="text-sm text-gray-700 space-y-2">
                                {step.resources.map((item, idx) => (
                                  <li key={idx} className="flex items-start">
                                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-sm text-gray-400 italic">No resources for this step</p>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col space-y-4">
                        {Object.entries(step.departments).map(([dept, touchpoints]) => (
                          shouldShowCGADepartment(dept) && (
                            <div key={dept} className={`transition-all duration-300 ${isDepartmentHighlighted(dept, step.title) ? 'ring-2 ring-red-400' : ''}`}>
                              <div className="border-2 rounded-lg p-4 bg-white" style={{borderColor: '#910027'}}>
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl" style={{backgroundColor: '#910027'}}>
                                    {getDepartmentIcon(dept)}
                                  </div>
                                  <h4 className="font-semibold text-gray-800 text-sm flex-1">{dept}:</h4>
                                </div>
                                <div className="space-y-3 max-h-32 overflow-y-auto">
                                  {touchpoints.map((touchpoint, idx) => (
                                    <div key={idx}>
                                      <h5 className="font-medium text-gray-700 text-xs mb-1">{touchpoint.title}</h5>
                                      <ul className="text-xs text-gray-600 space-y-1">
                                        {touchpoint.items.map((item, itemIdx) => (
                                          <li key={itemIdx} className="flex items-start">
                                            <span className="w-1 h-1 bg-gray-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                                            {item}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {showPainPoints && (
                <div className="mt-8 flex gap-4 w-full">
                  {journeySteps['pre-enrollment'].map((step, stepIdx) => (
                    <div key={stepIdx} className="flex-1">
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <h4 className="font-semibold text-red-800 text-sm mb-2 flex items-center">
                          <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                          Pain Points
                        </h4>
                        <div className="space-y-2">
                          {(painPoints[step.title] || []).map((pain, idx) => (
                            <div key={idx} className="bg-white p-2 rounded border-l-4 border-red-400">
                              <p className="text-xs text-gray-700">{pain}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {showOpportunities && (
                <div className="mt-4 flex gap-4 w-full">
                  {journeySteps['pre-enrollment'].map((step, stepIdx) => (
                    <div key={stepIdx} className="flex-1">
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <h4 className="font-semibold text-yellow-800 text-sm mb-2 flex items-center">
                          <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                          Opportunities
                        </h4>
                        <div className="space-y-2">
                          {(opportunities[step.title] || []).map((opp, idx) => (
                            <div key={idx} className="bg-white p-2 rounded border-l-4 border-yellow-400">
                              <p className="text-xs text-gray-700">{opp}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {shouldShowStage('active') && (
            <div className="mb-8">
              <div className="text-center mb-6 bg-green-100 p-4 rounded-lg border-t-4 border-green-600">
                <h2 className="font-bold text-2xl text-gray-800">📚 Active Stage</h2>
                <p className="text-gray-600">Learning & Growth</p>
              </div>
              
              <div className="flex gap-4 w-full items-start">
                {journeySteps['active'].map((step, stepIdx) => (
                  <div key={stepIdx} className="flex-1 flex flex-col">
                    <div 
                      className={`text-center mb-4 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                        isStepHighlighted(step.title) ? 'bg-yellow-200 ring-2 ring-yellow-400' : 'bg-green-50 hover:bg-green-100'
                      }`}
                      onClick={() => setHighlightedStep(isStepHighlighted(step.title) ? null : step.title)}
                    >
                      <div className="flex items-center justify-center mb-2">
                        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {stepIdx + 1}
                        </div>
                      </div>
                      <h3 className="font-bold text-green-800 text-sm">{step.title}</h3>
                      <p className="text-xs text-gray-600 mt-1">👆 Click to highlight departments</p>
                    </div>

                    <div className="flex-1 flex flex-col">
                      <div className="bg-indigo-100 p-4 rounded-lg border-t-4 border-indigo-600 flex-grow mb-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                          </div>
                          <h4 className="font-bold text-indigo-800 text-lg">Student Experience</h4>
                        </div>
                        
                        <div className="bg-white rounded-lg p-3 shadow-sm mb-3">
                          <h5 className="font-semibold text-indigo-700 text-sm mb-2">Student Actions</h5>
                          <ul className="text-sm text-gray-700 space-y-2">
                            {step.student.map((item, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="w-2 h-2 bg-indigo-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {showResources && (
                          <div className={`bg-white rounded-lg p-3 shadow-sm transition-all duration-300 ${isDepartmentHighlighted('Resources', step.title) ? 'ring-2 ring-gray-400' : ''}`}>
                            <h5 className="font-semibold text-gray-700 text-sm mb-2">Systems & Resources</h5>
                            {step.resources.length > 0 ? (
                              <ul className="text-sm text-gray-700 space-y-2">
                                {step.resources.map((item, idx) => (
                                  <li key={idx} className="flex items-start">
                                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-sm text-gray-400 italic">No resources for this step</p>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col space-y-4">
                        {Object.entries(step.departments).map(([dept, touchpoints]) => (
                          shouldShowCGADepartment(dept) && (
                            <div key={dept} className={`transition-all duration-300 ${isDepartmentHighlighted(dept, step.title) ? 'ring-2 ring-red-400' : ''}`}>
                              <div className="border-2 rounded-lg p-4 bg-white" style={{borderColor: '#910027'}}>
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl" style={{backgroundColor: '#910027'}}>
                                    {getDepartmentIcon(dept)}
                                  </div>
                                  <h4 className="font-semibold text-gray-800 text-sm flex-1">{dept}:</h4>
                                </div>
                                <div className="space-y-3 max-h-32 overflow-y-auto">
                                  {touchpoints.map((touchpoint, idx) => (
                                    <div key={idx}>
                                      <h5 className="font-medium text-gray-700 text-xs mb-1">{touchpoint.title}</h5>
                                      <ul className="text-xs text-gray-600 space-y-1">
                                        {touchpoint.items.map((item, itemIdx) => (
                                          <li key={itemIdx} className="flex items-start">
                                            <span className="w-1 h-1 bg-gray-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                                            {item}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {showPainPoints && (
                <div className="mt-8 flex gap-4 w-full items-start">
                  {journeySteps['active'].map((step, stepIdx) => (
                    <div key={stepIdx} className="flex-1">
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <h4 className="font-semibold text-red-800 text-sm mb-2 flex items-center">
                          <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                          Pain Points
                        </h4>
                        <div className="space-y-2">
                          {(painPoints[step.title] || []).map((pain, idx) => (
                            <div key={idx} className="bg-white p-2 rounded border-l-4 border-red-400">
                              <p className="text-xs text-gray-700">{pain}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {showOpportunities && (
                <div className="mt-4 flex gap-4 w-full">
                  {journeySteps['active'].map((step, stepIdx) => (
                    <div key={stepIdx} className="flex-1">
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <h4 className="font-semibold text-yellow-800 text-sm mb-2 flex items-center">
                          <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                          Opportunities
                        </h4>
                        <div className="space-y-2">
                          {(opportunities[step.title] || []).map((opp, idx) => (
                            <div key={idx} className="bg-white p-2 rounded border-l-4 border-yellow-400">
                              <p className="text-xs text-gray-700">{opp}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {shouldShowStage('post-graduate') && (
            <div className="mb-8">
              <div className="text-center mb-6 bg-yellow-100 p-4 rounded-lg border-t-4 border-yellow-600">
                <h2 className="font-bold text-2xl text-gray-800">🚀 Post-Graduate Stage</h2>
                <p className="text-gray-600">Career & Alumni</p>
              </div>
              
              <div className="flex gap-4 w-full">
                {journeySteps['post-graduate'].map((step, stepIdx) => (
                  <div key={stepIdx} className="flex-1 flex flex-col">
                    <div 
                      className={`text-center mb-4 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                        isStepHighlighted(step.title) ? 'bg-yellow-200 ring-2 ring-yellow-400' : 'bg-yellow-50 hover:bg-yellow-100'
                      }`}
                      onClick={() => setHighlightedStep(isStepHighlighted(step.title) ? null : step.title)}
                    >
                      <div className="flex items-center justify-center mb-2">
                        <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {stepIdx + 1}
                        </div>
                      </div>
                      <h3 className="font-bold text-yellow-800 text-sm">{step.title}</h3>
                      <p className="text-xs text-gray-600 mt-1">👆 Click to highlight departments</p>
                    </div>

                    <div className="flex-1 flex flex-col">
                      <div className="bg-indigo-100 p-4 rounded-lg border-t-4 border-indigo-600 flex-grow mb-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                          </div>
                          <h4 className="font-bold text-indigo-800 text-lg">Student Experience</h4>
                        </div>
                        
                        <div className="bg-white rounded-lg p-3 shadow-sm mb-3">
                          <h5 className="font-semibold text-indigo-700 text-sm mb-2">Student Actions</h5>
                          <ul className="text-sm text-gray-700 space-y-2">
                            {step.student.map((item, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="w-2 h-2 bg-indigo-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {showResources && (
                          <div className={`bg-white rounded-lg p-3 shadow-sm transition-all duration-300 ${isDepartmentHighlighted('Resources', step.title) ? 'ring-2 ring-gray-400' : ''}`}>
                            <h5 className="font-semibold text-gray-700 text-sm mb-2">Systems & Resources</h5>
                            {step.resources.length > 0 ? (
                              <ul className="text-sm text-gray-700 space-y-2">
                                {step.resources.map((item, idx) => (
                                  <li key={idx} className="flex items-start">
                                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-sm text-gray-400 italic">No resources for this step</p>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col space-y-4">
                        {Object.entries(step.departments).map(([dept, touchpoints]) => (
                          shouldShowCGADepartment(dept) && (
                            <div key={dept} className={`transition-all duration-300 ${isDepartmentHighlighted(dept, step.title) ? 'ring-2 ring-red-400' : ''}`}>
                              <div className="border-2 rounded-lg p-4 bg-white" style={{borderColor: '#910027'}}>
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl" style={{backgroundColor: '#910027'}}>
                                    {getDepartmentIcon(dept)}
                                  </div>
                                  <h4 className="font-semibold text-gray-800 text-sm flex-1">{dept}:</h4>
                                </div>
                                <div className="space-y-3 max-h-32 overflow-y-auto">
                                  {touchpoints.map((touchpoint, idx) => (
                                    <div key={idx}>
                                      <h5 className="font-medium text-gray-700 text-xs mb-1">{touchpoint.title}</h5>
                                      <ul className="text-xs text-gray-600 space-y-1">
                                        {touchpoint.items.map((item, itemIdx) => (
                                          <li key={itemIdx} className="flex items-start">
                                            <span className="w-1 h-1 bg-gray-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                                            {item}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {showPainPoints && (
                <div className="mt-8 flex gap-4 w-full">
                  {journeySteps['post-graduate'].map((step, stepIdx) => (
                    <div key={stepIdx} className="flex-1">
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <h4 className="font-semibold text-red-800 text-sm mb-2 flex items-center">
                          <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                          Pain Points
                        </h4>
                        <div className="space-y-2">
                          {(painPoints[step.title] || []).map((pain, idx) => (
                            <div key={idx} className="bg-white p-2 rounded border-l-4 border-red-400">
                              <p className="text-xs text-gray-700">{pain}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {showOpportunities && (
                <div className="mt-4 flex gap-4 w-full">
                  {journeySteps['post-graduate'].map((step, stepIdx) => (
                    <div key={stepIdx} className="flex-1">
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <h4 className="font-semibold text-yellow-800 text-sm mb-2 flex items-center">
                          <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                          Opportunities
                        </h4>
                        <div className="space-y-2">
                          {(opportunities[step.title] || []).map((opp, idx) => (
                            <div key={idx} className="bg-white p-2 rounded border-l-4 border-yellow-400">
                              <p className="text-xs text-gray-700">{opp}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CGAJourneyMap;