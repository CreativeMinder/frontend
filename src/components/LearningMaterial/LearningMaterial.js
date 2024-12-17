import React from 'react';

const InterestList = ({ selectedInterest }) => {
    const interestsData = [
        {
            name: "Web Development",
            resources: [
                {
                    title: "HTML & CSS",
                    description: "HTML and CSS are the foundational languages for creating web pages. HTML structures the content, while CSS styles it.",
                    steps: [
                        "Learn the basic HTML tags (e.g., headings, paragraphs, links, images).",
                        "Understand the CSS box model (margin, padding, border).",
                        "Practice creating simple layouts using flexbox and grid.",
                        "Explore responsive design with media queries."
                    ]
                },
                {
                    title: "JavaScript",
                    description: "JavaScript is the programming language of the web, enabling dynamic and interactive content on websites.",
                    steps: [
                        "Learn basic syntax and data types (strings, numbers, arrays).",
                        "Understand control flow (if statements, loops).",
                        "Explore functions and scope.",
                        "Manipulate the DOM to update HTML and CSS dynamically."
                    ]
                },
                {
                    title: "Responsive Web Design",
                    description: "Responsive web design ensures that web pages look good on all devices, from desktops to mobile phones.",
                    steps: [
                        "Learn about fluid grids and flexible images.",
                        "Implement media queries for different screen sizes.",
                        "Practice creating mobile-first designs.",
                        "Explore frameworks like Bootstrap for rapid prototyping."
                    ]
                },
                {
                    title: "Git & GitHub",
                    description: "Git is a version control system, and GitHub is a platform for hosting and collaborating on Git repositories.",
                    steps: [
                        "Learn basic Git commands (clone, commit, push, pull).",
                        "Understand branching and merging workflows.",
                        "Explore how to collaborate on projects using GitHub.",
                        "Practice creating and managing repositories."
                    ]
                },
                {
                    title: "React",
                    description: "React is a JavaScript library for building user interfaces, particularly single-page applications.",
                    steps: [
                        "Learn about components, props, and state.",
                        "Understand the component lifecycle and hooks.",
                        "Practice building small applications using Create React App.",
                        "Explore React Router for handling navigation."
                    ]
                },
                {
                    title: "Node.js",
                    description: "Node.js is a JavaScript runtime that allows you to run JavaScript on the server side.",
                    steps: [
                        "Learn about npm and package management.",
                        "Understand the basics of Express.js for building web servers.",
                        "Explore middleware and routing.",
                        "Practice building RESTful APIs with Node.js."
                    ]
                },
                {
                    title: "Databases (SQL, MongoDB)",
                    description: "Databases are essential for storing and managing data. SQL is for relational databases, while MongoDB is a NoSQL database.",
                    steps: [
                        "Learn SQL basics (SELECT, INSERT, UPDATE, DELETE).",
                        "Understand database design and normalization.",
                        "Explore MongoDB and how to perform CRUD operations.",
                        "Practice querying databases and managing data."
                    ]
                },
                {
                    title: "APIs & RESTful Services",
                    description: "APIs (Application Programming Interfaces) allow different software systems to communicate. RESTful services use HTTP requests to access and manipulate data.",
                    steps: [
                        "Learn about HTTP methods (GET, POST, PUT, DELETE).",
                        "Understand API endpoints and data formats (JSON, XML).",
                        "Explore how to consume APIs in web applications.",
                        "Practice building your own RESTful services."
                    ]
                },
                {
                    title: "Web Performance Optimization",
                    description: "Web performance optimization involves techniques to improve the loading speed and efficiency of web applications.",
                    steps: [
                        "Learn about the critical rendering path and how browsers render pages.",
                        "Understand image optimization techniques.",
                        "Explore code minification and bundling.",
                        "Practice using tools like Lighthouse to analyze performance."
                    ]
                },
                {
                    title: "Advanced JavaScript (ES6+)",
                    description: "Advanced JavaScript concepts (ES6 and beyond) enhance the capabilities of the language for building complex applications.",
                    steps: [
                        "Learn about modern JavaScript features (let, const, arrow functions).",
                        "Understand promises and async/await for asynchronous programming.",
                        "Explore modules and how to structure JavaScript applications.",
                        "Practice using JavaScript in real-world applications."
                    ]
                },
                // ... other resources
            ]
        },
        {
            name: "Electrical Engineering",
            resources: [
                {
                    title: "Circuit Theory",
                    description: "Study the fundamental concepts of electrical circuits, including Ohm's law, Kirchhoff's laws, and circuit analysis techniques.",
                    steps: [
                        "Understand basic electrical concepts (voltage, current, resistance).",
                        "Learn about series and parallel circuits.",
                        "Explore circuit analysis techniques (nodal, mesh analysis).",
                        "Practice solving circuit problems."
                    ]
                },
                {
                    title: "Electromagnetism",
                    description: "Explore the principles of electromagnetism, including electric fields, magnetic fields, and their interactions.",
                    steps: [
                        "Learn about Coulomb's law and electric field concepts.",
                        "Understand magnetic fields and Ampère's law.",
                        "Explore Faraday's law of electromagnetic induction.",
                        "Study applications of electromagnetism in technology."
                    ]
                },
                {
                    title: "Digital Logic Design",
                    description: "Learn the principles of designing digital circuits using logic gates, flip-flops, and state machines.",
                    steps: [
                        "Understand binary number systems and Boolean algebra.",
                        "Learn about logic gates and their functions.",
                        "Design combinational and sequential circuits.",
                        "Explore the use of simulation software for circuit design."
                    ]
                },
                {
                    title: "Microprocessors & Microcontrollers",
                    description: "Study the architecture and programming of microprocessors and microcontrollers for embedded systems.",
                    steps: [
                        "Learn about microprocessor architecture and operation.",
                        "Understand microcontroller components and interfaces.",
                        "Explore assembly and high-level programming languages.",
                        "Implement simple projects using microcontrollers."
                    ]
                },
                {
                    title: "Control Systems",
                    description: "Understand the theory and applications of control systems in engineering, including feedback and stability.",
                    steps: [
                        "Learn about system modeling and transfer functions.",
                        "Explore feedback control mechanisms.",
                        "Study stability criteria (Routh-Hurwitz, Nyquist).",
                        "Implement control strategies in real-world systems."
                    ]
                },
                {
                    title: "Signal Processing",
                    description: "Explore techniques for analyzing and processing signals, including time-domain and frequency-domain methods.",
                    steps: [
                        "Understand types of signals and their representations.",
                        "Learn about Fourier transforms and frequency analysis.",
                        "Explore filtering techniques and their applications.",
                        "Implement signal processing algorithms in software."
                    ]
                },
                {
                    title: "Power Systems",
                    description: "Study the generation, transmission, and distribution of electrical power, including power quality and reliability.",
                    steps: [
                        "Understand power generation methods (thermal, hydro, renewable).",
                        "Learn about transmission line parameters and models.",
                        "Explore power system stability and control.",
                        "Analyze power distribution systems."
                    ]
                },
                {
                    title: "Embedded Systems",
                    description: "Learn about designing and developing embedded systems for various applications, integrating hardware and software.",
                    steps: [
                        "Understand the architecture of embedded systems.",
                        "Learn about sensors, actuators, and microcontrollers.",
                        "Explore real-time operating systems (RTOS).",
                        "Develop embedded applications using C/C++."
                    ]
                },
                {
                    title: "Analog & Digital Communication",
                    description: "Explore the principles of communication systems, including analog and digital modulation techniques.",
                    steps: [
                        "Understand basic concepts of communication systems.",
                        "Learn about modulation techniques (AM, FM, PM).",
                        "Explore digital communication methods (PCM, QAM).",
                        "Analyze performance metrics of communication systems."
                    ]
                },
                {
                    title: "VLSI Design",
                    description: "Study the principles of Very Large Scale Integration (VLSI) design and the process of creating integrated circuits.",
                    steps: [
                        "Learn about semiconductor physics and materials.",
                        "Understand VLSI design methodologies and tools.",
                        "Explore the design of digital and analog circuits.",
                        "Implement VLSI designs using CAD tools."
                    ]
                }
            ]
        },
        {
            name: "Data Science",
            resources: [
                {
                    title: "Python Programming",
                    description: "Learn the fundamentals of Python programming, focusing on data science applications and libraries.",
                    steps: [
                        "Install Python and set up the development environment.",
                        "Learn basic syntax and data types (lists, tuples, dictionaries).",
                        "Understand control flow (if statements, loops).",
                        "Explore functions and modules for code organization."
                    ]
                },
                {
                    title: "Statistics & Probability",
                    description: "Understand the basics of statistics and probability, essential for data analysis.",
                    steps: [
                        "Learn about descriptive statistics (mean, median, mode).",
                        "Understand probability concepts (independent and dependent events).",
                        "Explore distributions (normal, binomial, Poisson).",
                        "Study hypothesis testing and confidence intervals."
                    ]
                },
                {
                    title: "Data Cleaning & Preprocessing",
                    description: "Learn techniques for cleaning and preprocessing data to ensure high-quality datasets.",
                    steps: [
                        "Understand the importance of data quality.",
                        "Learn to handle missing values and outliers.",
                        "Explore data transformation techniques (scaling, encoding).",
                        "Practice cleaning datasets using Pandas."
                    ]
                },
                {
                    title: "Data Analysis with Pandas",
                    description: "Use Pandas for data manipulation and analysis in Python.",
                    steps: [
                        "Learn about DataFrames and Series in Pandas.",
                        "Explore data filtering and selection techniques.",
                        "Perform data aggregation and grouping.",
                        "Visualize data with built-in Pandas plotting functions."
                    ]
                },
                {
                    title: "Data Visualization (Matplotlib, Seaborn)",
                    description: "Create informative visualizations using Matplotlib and Seaborn libraries.",
                    steps: [
                        "Understand the importance of data visualization.",
                        "Learn to create basic plots (line, bar, scatter).",
                        "Explore advanced visualizations (heatmaps, pair plots).",
                        "Customize plots with labels, titles, and legends."
                    ]
                },
                {
                    title: "Machine Learning Basics",
                    description: "Get introduced to the fundamentals of machine learning, including algorithms and model evaluation.",
                    steps: [
                        "Understand the difference between supervised and unsupervised learning.",
                        "Learn about common algorithms (linear regression, decision trees).",
                        "Explore the concepts of training and testing datasets.",
                        "Study model evaluation metrics (accuracy, precision, recall)."
                    ]
                },
                {
                    title: "Advanced Machine Learning (Scikit-Learn)",
                    description: "Dive deeper into machine learning techniques using the Scikit-Learn library.",
                    steps: [
                        "Learn about feature selection and engineering.",
                        "Explore advanced algorithms (support vector machines, random forests).",
                        "Understand cross-validation and hyperparameter tuning.",
                        "Implement end-to-end machine learning projects."
                    ]
                },
                {
                    title: "Big Data Tools (Hadoop, Spark)",
                    description: "Understand the ecosystem of big data tools and frameworks like Hadoop and Spark.",
                    steps: [
                        "Learn the basics of big data and its importance.",
                        "Explore the architecture of Hadoop and its components (HDFS, MapReduce).",
                        "Understand the Spark ecosystem and its advantages over Hadoop.",
                        "Implement data processing tasks using Spark."
                    ]
                },
                {
                    title: "Deep Learning (TensorFlow, PyTorch)",
                    description: "Learn about deep learning concepts and frameworks like TensorFlow and PyTorch.",
                    steps: [
                        "Understand the fundamentals of neural networks.",
                        "Explore various types of neural networks (CNNs, RNNs).",
                        "Learn to implement models using TensorFlow and PyTorch.",
                        "Study techniques for model optimization and regularization."
                    ]
                },
                {
                    title: "Deployment & MLOps",
                    description: "Explore deployment strategies for machine learning models and the principles of MLOps.",
                    steps: [
                        "Learn about different deployment options (cloud, on-premises).",
                        "Understand the concept of MLOps and its importance.",
                        "Explore tools for monitoring and managing deployed models.",
                        "Implement a CI/CD pipeline for machine learning projects."
                    ]
                }
            ]
        },
        {
            name: "Graphic Design",
            resources: [
                {
                    title: "Design Principles",
                    description: "Learn the foundational principles of design, including balance, contrast, alignment, repetition, and proximity.",
                    steps: [
                        "Understand the basics of visual hierarchy.",
                        "Explore the use of space and layout.",
                        "Learn about color harmony and composition.",
                        "Study real-world design examples to identify principles in action."
                    ]
                },
                {
                    title: "Photoshop Basics",
                    description: "Get started with Adobe Photoshop, covering essential tools and techniques for image editing.",
                    steps: [
                        "Install Photoshop and familiarize yourself with the interface.",
                        "Learn about layers, selections, and masks.",
                        "Explore basic photo editing techniques (cropping, resizing).",
                        "Practice using brushes, text, and effects."
                    ]
                },
                {
                    title: "Illustrator Basics",
                    description: "Dive into Adobe Illustrator, focusing on vector graphics creation and manipulation.",
                    steps: [
                        "Understand the difference between raster and vector graphics.",
                        "Explore the basic tools (pen tool, shapes, text).",
                        "Learn about creating and manipulating paths.",
                        "Practice designing simple illustrations and logos."
                    ]
                },
                {
                    title: "Color Theory",
                    description: "Explore the fundamentals of color theory and its application in design projects.",
                    steps: [
                        "Understand the color wheel and color relationships (complementary, analogous).",
                        "Learn about color harmony and its emotional impact.",
                        "Explore color models (RGB, CMYK).",
                        "Practice creating color palettes for design projects."
                    ]
                },
                {
                    title: "Typography",
                    description: "Learn the art of typography, including font selection, pairing, and effective text layout.",
                    steps: [
                        "Understand the anatomy of type and different font categories.",
                        "Explore the principles of good typography (legibility, hierarchy).",
                        "Learn about font pairing techniques.",
                        "Practice designing typographic layouts for various mediums."
                    ]
                },
                {
                    title: "Advanced Photoshop",
                    description: "Enhance your Photoshop skills with advanced techniques and tools for professional-level editing.",
                    steps: [
                        "Learn about advanced retouching techniques.",
                        "Explore compositing and blending modes.",
                        "Understand color correction and grading.",
                        "Practice creating complex designs and effects."
                    ]
                },
                {
                    title: "Advanced Illustrator",
                    description: "Take your Illustrator skills to the next level with advanced techniques for creating intricate designs.",
                    steps: [
                        "Explore advanced vector manipulation techniques.",
                        "Learn about creating complex shapes and patterns.",
                        "Understand the use of effects and appearances.",
                        "Practice designing detailed illustrations and infographics."
                    ]
                },
                {
                    title: "InDesign",
                    description: "Get familiar with Adobe InDesign for layout design, including brochures, magazines, and books.",
                    steps: [
                        "Learn the InDesign interface and workspace.",
                        "Explore text formatting and styles.",
                        "Understand the use of grids and guides for layout.",
                        "Practice creating multi-page documents with images and text."
                    ]
                },
                {
                    title: "UI/UX Design",
                    description: "Learn the principles of user interface (UI) and user experience (UX) design for digital products.",
                    steps: [
                        "Understand the basics of UI/UX design and its importance.",
                        "Explore user research methods and personas.",
                        "Learn about wireframing and prototyping tools.",
                        "Practice designing user-centered interfaces."
                    ]
                },
                {
                    title: "Portfolio Development",
                    description: "Develop a professional portfolio that showcases your graphic design skills and projects.",
                    steps: [
                        "Gather and select your best design work.",
                        "Learn about portfolio presentation techniques.",
                        "Explore online portfolio platforms and website design.",
                        "Create a compelling narrative to accompany your work."
                    ]
                }
            ]
        },
        {
            name: "Digital Marketing",
            resources: [
                {
                    title: "SEO Basics",
                    description: "Learn the fundamentals of Search Engine Optimization (SEO) to improve website visibility.",
                    steps: [
                        "Understand how search engines work.",
                        "Learn about keyword research and analysis.",
                        "Explore on-page SEO techniques (meta tags, headings).",
                        "Study off-page SEO strategies (backlinking, social signals)."
                    ]
                },
                {
                    title: "Content Marketing Strategies",
                    description: "Discover how to create effective content marketing strategies to engage and attract customers.",
                    steps: [
                        "Identify target audiences and their needs.",
                        "Learn about different content formats (blogs, videos, infographics).",
                        "Explore content distribution channels.",
                        "Develop a content calendar for consistency."
                    ]
                },
                {
                    title: "Social Media Marketing",
                    description: "Understand how to leverage social media platforms for marketing and brand awareness.",
                    steps: [
                        "Identify the right social media platforms for your audience.",
                        "Learn about creating engaging content for social media.",
                        "Explore social media advertising options.",
                        "Analyze social media metrics to measure success."
                    ]
                },
                {
                    title: "Email Marketing",
                    description: "Learn how to create effective email marketing campaigns that drive engagement and conversions.",
                    steps: [
                        "Understand the components of a successful email campaign.",
                        "Learn about building and segmenting email lists.",
                        "Explore email design and content best practices.",
                        "Analyze email campaign performance metrics."
                    ]
                },
                {
                    title: "Google Analytics",
                    description: "Get familiar with Google Analytics to track and analyze website traffic and user behavior.",
                    steps: [
                        "Set up a Google Analytics account and property.",
                        "Learn about tracking website visitors and their behavior.",
                        "Explore key metrics and reports.",
                        "Understand how to set up goals and conversions."
                    ]
                },
                {
                    title: "Google Ads & PPC",
                    description: "Dive into Google Ads and Pay-Per-Click (PPC) advertising strategies to drive traffic to your site.",
                    steps: [
                        "Understand how Google Ads works and its structure.",
                        "Learn about keyword selection and ad targeting.",
                        "Explore ad copywriting best practices.",
                        "Analyze ad performance and ROI."
                    ]
                },
                {
                    title: "Affiliate Marketing",
                    description: "Discover how to set up and manage affiliate marketing programs to boost sales.",
                    steps: [
                        "Understand the basics of affiliate marketing.",
                        "Learn how to choose the right affiliates.",
                        "Explore affiliate program management tools.",
                        "Analyze affiliate performance and optimize accordingly."
                    ]
                },
                {
                    title: "Influencer Marketing",
                    description: "Learn how to collaborate with influencers to enhance brand visibility and credibility.",
                    steps: [
                        "Identify potential influencers in your niche.",
                        "Learn how to approach and negotiate with influencers.",
                        "Explore campaign types (sponsored posts, giveaways).",
                        "Measure the impact of influencer collaborations."
                    ]
                },
                {
                    title: "Conversion Rate Optimization (CRO)",
                    description: "Understand how to improve your website's conversion rate through various strategies and techniques.",
                    steps: [
                        "Learn the principles of CRO and its importance.",
                        "Identify areas for improvement on your website.",
                        "Explore A/B testing and user experience optimization.",
                        "Analyze results and implement changes based on data."
                    ]
                },
                {
                    title: "Advanced Digital Marketing Analytics",
                    description: "Delve into advanced analytics techniques for deeper insights into digital marketing performance.",
                    steps: [
                        "Explore advanced data analysis tools and techniques.",
                        "Learn about attribution modeling and its importance.",
                        "Understand customer journey mapping and its implications.",
                        "Analyze multi-channel marketing performance."
                    ]
                }
            ]
        },
        {
            name: "Machine Learning",
            resources: [
                {
                    title: "Introduction to Machine Learning",
                    description: "Learn the basics of machine learning, its applications, and types of algorithms.",
                    steps: [
                        "Understand the definition and scope of machine learning.",
                        "Explore the different types of machine learning (supervised, unsupervised, reinforcement).",
                        "Learn about the machine learning workflow.",
                        "Familiarize yourself with common machine learning libraries and tools."
                    ]
                },
                {
                    title: "Linear Algebra & Calculus Basics",
                    description: "Acquire foundational knowledge in linear algebra and calculus essential for machine learning.",
                    steps: [
                        "Understand vectors, matrices, and operations on them.",
                        "Learn about eigenvalues and eigenvectors.",
                        "Explore derivatives and gradients.",
                        "Familiarize yourself with optimization concepts."
                    ]
                },
                {
                    title: "Supervised Learning",
                    description: "Dive into supervised learning techniques and algorithms for predictive modeling.",
                    steps: [
                        "Understand the concept of labeled data and how it differs from unlabeled data.",
                        "Learn about common algorithms (linear regression, logistic regression, decision trees).",
                        "Explore training and testing datasets.",
                        "Evaluate model performance using accuracy, precision, recall, and F1 score."
                    ]
                },
                {
                    title: "Unsupervised Learning",
                    description: "Explore unsupervised learning techniques for finding patterns in unlabelled data.",
                    steps: [
                        "Understand the concept of clustering and dimensionality reduction.",
                        "Learn about common algorithms (K-means, hierarchical clustering, PCA).",
                        "Explore applications in anomaly detection and market segmentation.",
                        "Evaluate clustering performance using silhouette score and elbow method."
                    ]
                },
                {
                    title: "Feature Engineering",
                    description: "Learn how to select and create features that improve model performance.",
                    steps: [
                        "Understand the importance of features in machine learning models.",
                        "Learn techniques for feature selection (filter methods, wrapper methods, embedded methods).",
                        "Explore techniques for feature creation and transformation.",
                        "Familiarize yourself with dealing with missing values and outliers."
                    ]
                },
                {
                    title: "Model Evaluation Metrics",
                    description: "Understand various metrics used to evaluate machine learning models.",
                    steps: [
                        "Learn about different evaluation metrics for classification (accuracy, precision, recall).",
                        "Explore evaluation metrics for regression (MSE, RMSE, R-squared).",
                        "Understand the concepts of overfitting and underfitting.",
                        "Learn about cross-validation techniques."
                    ]
                },
                {
                    title: "Deep Learning Foundations",
                    description: "Get introduced to deep learning and its core concepts.",
                    steps: [
                        "Understand the differences between traditional machine learning and deep learning.",
                        "Learn about artificial neural networks (ANNs) and their components.",
                        "Explore activation functions, loss functions, and optimization techniques.",
                        "Familiarize yourself with common deep learning frameworks (TensorFlow, Keras)."
                    ]
                },
                {
                    title: "Neural Networks",
                    description: "Dive deeper into neural networks, their architecture, and applications.",
                    steps: [
                        "Understand the architecture of neural networks (input, hidden, output layers).",
                        "Learn about training neural networks using backpropagation.",
                        "Explore different types of neural networks (CNNs, RNNs).",
                        "Familiarize yourself with common use cases (image classification, natural language processing)."
                    ]
                },
                {
                    title: "Transfer Learning",
                    description: "Learn about transfer learning and how to leverage pre-trained models.",
                    steps: [
                        "Understand the concept of transfer learning and its advantages.",
                        "Explore popular pre-trained models (VGG16, ResNet, BERT).",
                        "Learn how to fine-tune models for specific tasks.",
                        "Implement transfer learning in practice using libraries like Keras or PyTorch."
                    ]
                },
                {
                    title: "Model Deployment",
                    description: "Understand the processes involved in deploying machine learning models into production.",
                    steps: [
                        "Learn about different deployment options (cloud services, on-premises).",
                        "Understand the importance of model versioning and monitoring.",
                        "Explore tools for deploying models (Flask, FastAPI, Docker).",
                        "Familiarize yourself with best practices for maintaining deployed models."
                    ]
                }
            ]
        },
        {
            name: "Cybersecurity",
            resources: [
                {
                    title: "Networking Fundamentals",
                    description: "Learn the basics of computer networking, including protocols, models, and technologies.",
                    steps: [
                        "Understand the OSI and TCP/IP models.",
                        "Learn about common networking protocols (HTTP, FTP, TCP, UDP).",
                        "Explore IP addressing and subnetting.",
                        "Familiarize yourself with networking devices (routers, switches, firewalls)."
                    ]
                },
                {
                    title: "Introduction to Cybersecurity",
                    description: "Get an overview of cybersecurity concepts, principles, and best practices.",
                    steps: [
                        "Define cybersecurity and its importance in today's digital world.",
                        "Learn about common threats and vulnerabilities.",
                        "Understand the role of cybersecurity professionals.",
                        "Explore fundamental principles such as the CIA triad (Confidentiality, Integrity, Availability)."
                    ]
                },
                {
                    title: "Network Security",
                    description: "Delve into strategies and techniques to protect networks from attacks.",
                    steps: [
                        "Understand the principles of network security architecture.",
                        "Learn about firewalls, intrusion detection systems (IDS), and intrusion prevention systems (IPS).",
                        "Explore virtual private networks (VPNs) and secure network design.",
                        "Familiarize yourself with network security policies and procedures."
                    ]
                },
                {
                    title: "Cryptography",
                    description: "Discover the science of encoding and decoding information for secure communication.",
                    steps: [
                        "Understand the basics of cryptographic algorithms (symmetric and asymmetric).",
                        "Learn about hashing and digital signatures.",
                        "Explore key management and cryptographic protocols (SSL/TLS).",
                        "Familiarize yourself with real-world applications of cryptography."
                    ]
                },
                {
                    title: "Ethical Hacking",
                    description: "Learn the techniques used by ethical hackers to identify and mitigate vulnerabilities.",
                    steps: [
                        "Understand the ethical hacking process and methodologies.",
                        "Learn about reconnaissance, scanning, and enumeration techniques.",
                        "Explore exploitation techniques and tools (Metasploit, Nmap).",
                        "Familiarize yourself with reporting and remediation strategies."
                    ]
                },
                {
                    title: "Cyber Threat Intelligence",
                    description: "Explore the collection and analysis of information to understand and mitigate cyber threats.",
                    steps: [
                        "Define cyber threat intelligence and its significance.",
                        "Learn about threat actors and their motivations.",
                        "Explore threat intelligence lifecycle and frameworks.",
                        "Familiarize yourself with tools for threat intelligence gathering and analysis."
                    ]
                },
                {
                    title: "Incident Response",
                    description: "Learn how to effectively respond to and manage cybersecurity incidents.",
                    steps: [
                        "Understand the incident response lifecycle (preparation, detection, analysis, containment, eradication, recovery).",
                        "Explore incident response team roles and responsibilities.",
                        "Learn about communication and coordination during incidents.",
                        "Familiarize yourself with incident reporting and documentation."
                    ]
                },
                {
                    title: "Forensics Analysis",
                    description: "Dive into techniques used to investigate and analyze cyber incidents.",
                    steps: [
                        "Understand the principles of digital forensics.",
                        "Learn about evidence collection and preservation techniques.",
                        "Explore analysis tools for examining data (disk, memory, network).",
                        "Familiarize yourself with reporting findings and presenting evidence."
                    ]
                },
                {
                    title: "Security Information and Event Management (SIEM)",
                    description: "Explore SIEM technologies and their role in cybersecurity monitoring and response.",
                    steps: [
                        "Define SIEM and its importance in security operations.",
                        "Learn about log collection and analysis techniques.",
                        "Explore correlation rules and alerting mechanisms.",
                        "Familiarize yourself with popular SIEM tools (Splunk, ELK Stack)."
                    ]
                },
                {
                    title: "Penetration Testing",
                    description: "Learn how to simulate cyber attacks to test the security of systems and networks.",
                    steps: [
                        "Understand the goals and methodologies of penetration testing.",
                        "Learn about reconnaissance, scanning, and exploitation phases.",
                        "Explore post-exploitation techniques and reporting.",
                        "Familiarize yourself with legal and ethical considerations in penetration testing."
                    ]
                }
            ]
        },
        {
            name: "Artificial Intelligence",
            resources: [
                {
                    title: "AI Basics",
                    description: "Understand the fundamental concepts and terminology of artificial intelligence.",
                    steps: [
                        "Define artificial intelligence and its applications.",
                        "Explore types of AI: narrow AI vs. general AI.",
                        "Learn about machine learning and deep learning.",
                        "Familiarize yourself with common AI tools and frameworks."
                    ]
                },
                {
                    title: "Introduction to Algorithms",
                    description: "Learn the basic algorithms and data structures essential for AI.",
                    steps: [
                        "Understand algorithm complexity and Big O notation.",
                        "Explore common data structures (arrays, linked lists, trees, graphs).",
                        "Learn about sorting and searching algorithms.",
                        "Familiarize yourself with dynamic programming and greedy algorithms."
                    ]
                },
                {
                    title: "Probability and Statistics",
                    description: "Grasp the foundational concepts of probability and statistics used in AI.",
                    steps: [
                        "Understand probability theory and distributions.",
                        "Learn about statistical inference and hypothesis testing.",
                        "Explore regression analysis and correlation.",
                        "Familiarize yourself with Bayesian statistics."
                    ]
                },
                {
                    title: "Natural Language Processing",
                    description: "Discover techniques for processing and analyzing human language data.",
                    steps: [
                        "Understand the basics of NLP and its applications.",
                        "Learn about text preprocessing techniques (tokenization, stemming, lemmatization).",
                        "Explore language models and sentiment analysis.",
                        "Familiarize yourself with libraries like NLTK and SpaCy."
                    ]
                },
                {
                    title: "Computer Vision",
                    description: "Learn methods for enabling computers to interpret visual information.",
                    steps: [
                        "Understand the fundamentals of image processing.",
                        "Explore techniques like image classification and object detection.",
                        "Learn about convolutional neural networks (CNNs).",
                        "Familiarize yourself with libraries such as OpenCV and TensorFlow."
                    ]
                },
                {
                    title: "AI Ethics",
                    description: "Explore ethical considerations and challenges in AI development.",
                    steps: [
                        "Understand the importance of ethical AI.",
                        "Learn about bias in AI systems and its implications.",
                        "Explore transparency, accountability, and fairness in AI.",
                        "Familiarize yourself with regulations and guidelines for ethical AI."
                    ]
                },
                {
                    title: "Reinforcement Learning",
                    description: "Delve into techniques where agents learn to make decisions through rewards.",
                    steps: [
                        "Understand the principles of reinforcement learning (RL).",
                        "Explore key concepts like agents, actions, rewards, and environments.",
                        "Learn about popular RL algorithms (Q-learning, Deep Q-Networks).",
                        "Familiarize yourself with applications of RL in gaming and robotics."
                    ]
                },
                {
                    title: "Generative Models",
                    description: "Discover models that can generate new data similar to training data.",
                    steps: [
                        "Understand the concept of generative models and their significance.",
                        "Learn about Generative Adversarial Networks (GANs).",
                        "Explore Variational Autoencoders (VAEs).",
                        "Familiarize yourself with applications of generative models in art and design."
                    ]
                },
                {
                    title: "AI Model Deployment",
                    description: "Learn how to deploy AI models into production environments.",
                    steps: [
                        "Understand the model deployment lifecycle.",
                        "Explore various deployment strategies (cloud, on-premises, edge).",
                        "Learn about tools and platforms for deployment (Docker, Kubernetes).",
                        "Familiarize yourself with monitoring and maintaining AI models in production."
                    ]
                },
                {
                    title: "AI Product Management",
                    description: "Discover the role of product management in AI-focused projects.",
                    steps: [
                        "Understand the fundamentals of product management in the tech industry.",
                        "Learn how to define AI product vision and strategy.",
                        "Explore methodologies for managing AI project lifecycles.",
                        "Familiarize yourself with metrics for measuring AI product success."
                    ]
                }
            ]
        },
        {
            name: "Mobile App Development",
            resources: [
                {
                    title: "Java/Kotlin for Android",
                    description: "Learn the fundamentals of Android app development using Java and Kotlin.",
                    steps: [
                        "Understand the basics of Java and Kotlin syntax.",
                        "Explore Android Studio and project structure.",
                        "Learn about Android UI components and layouts.",
                        "Implement activities, fragments, and intents."
                    ]
                },
                {
                    title: "Swift for iOS",
                    description: "Master iOS app development using Swift programming language.",
                    steps: [
                        "Understand Swift syntax and data types.",
                        "Explore Xcode and iOS project structure.",
                        "Learn about UIKit and building user interfaces.",
                        "Implement navigation and data storage in iOS apps."
                    ]
                },
                {
                    title: "Dart & Flutter",
                    description: "Develop cross-platform mobile applications using Dart and Flutter framework.",
                    steps: [
                        "Understand Dart programming language basics.",
                        "Explore Flutter framework and its widgets.",
                        "Learn about state management in Flutter.",
                        "Implement responsive layouts and animations."
                    ]
                },
                {
                    title: "React Native Basics",
                    description: "Get started with React Native for building mobile applications using React.",
                    steps: [
                        "Understand React Native components and architecture.",
                        "Explore navigation and routing in React Native.",
                        "Learn about styling components and layouts.",
                        "Implement data fetching and handling."
                    ]
                },
                {
                    title: "UI/UX Design for Mobile",
                    description: "Learn the principles of UI/UX design specifically for mobile applications.",
                    steps: [
                        "Understand user-centered design principles.",
                        "Explore mobile design guidelines (iOS and Android).",
                        "Learn about wireframing and prototyping tools.",
                        "Implement usability testing and gather feedback."
                    ]
                },
                {
                    title: "API Integration",
                    description: "Discover how to integrate APIs into mobile applications for data retrieval.",
                    steps: [
                        "Understand RESTful APIs and JSON data format.",
                        "Learn about authentication and authorization methods.",
                        "Implement API calls and error handling.",
                        "Display fetched data in your mobile application."
                    ]
                },
                {
                    title: "State Management (Redux, Provider)",
                    description: "Master state management techniques for mobile apps using Redux and Provider.",
                    steps: [
                        "Understand the concept of state management in apps.",
                        "Explore Redux architecture and components.",
                        "Learn about Provider and its usage in Flutter apps.",
                        "Implement state management solutions in your projects."
                    ]
                },
                {
                    title: "Testing & Debugging Mobile Apps",
                    description: "Learn how to effectively test and debug mobile applications.",
                    steps: [
                        "Understand the importance of testing in app development.",
                        "Explore different types of testing (unit, integration, UI).",
                        "Learn about debugging tools and techniques.",
                        "Implement automated testing frameworks in your apps."
                    ]
                },
                {
                    title: "App Store Optimization",
                    description: "Discover techniques for optimizing your mobile app's visibility in app stores.",
                    steps: [
                        "Understand the app store algorithms and ranking factors.",
                        "Learn about keyword research and metadata optimization.",
                        "Implement strategies for improving app ratings and reviews.",
                        "Monitor app performance and user engagement metrics."
                    ]
                },
                {
                    title: "Deploying to App Stores",
                    description: "Learn the process of deploying your mobile applications to app stores.",
                    steps: [
                        "Understand the requirements for publishing on Google Play and App Store.",
                        "Prepare app assets and marketing materials.",
                        "Learn about app submission guidelines and review processes.",
                        "Implement version control and updates for your app."
                    ]
                }
            ]
        },
        {
            name: "Cloud Computing",
            resources: [
                {
                    title: "Introduction to Cloud Computing",
                    description: "Understand the basics of cloud computing, its types, and benefits.",
                    steps: [
                        "Define cloud computing and its importance.",
                        "Explore different service models (IaaS, PaaS, SaaS).",
                        "Understand deployment models (public, private, hybrid).",
                        "Discuss cloud computing trends and future scope."
                    ]
                },
                {
                    title: "AWS Fundamentals",
                    description: "Learn the core services and features of Amazon Web Services (AWS).",
                    steps: [
                        "Create an AWS account and navigate the AWS Management Console.",
                        "Understand key AWS services like EC2, S3, and RDS.",
                        "Explore AWS pricing and billing models.",
                        "Learn about AWS identity and access management."
                    ]
                },
                {
                    title: "Azure Fundamentals",
                    description: "Get introduced to Microsoft Azure and its services.",
                    steps: [
                        "Create an Azure account and explore the Azure portal.",
                        "Understand key Azure services such as Azure VMs, Azure Functions, and Azure Storage.",
                        "Learn about Azure pricing and support plans.",
                        "Explore Azure governance and security features."
                    ]
                },
                {
                    title: "Google Cloud Basics",
                    description: "Discover the essential features and services of Google Cloud Platform (GCP).",
                    steps: [
                        "Create a GCP account and navigate the Google Cloud Console.",
                        "Understand core GCP services like Compute Engine, Cloud Storage, and BigQuery.",
                        "Explore GCP pricing and cost management tools.",
                        "Learn about GCP identity management and security best practices."
                    ]
                },
                {
                    title: "Virtualization & Containers (Docker)",
                    description: "Learn about virtualization concepts and containerization with Docker.",
                    steps: [
                        "Understand the differences between virtualization and containerization.",
                        "Install Docker and explore Docker images and containers.",
                        "Learn about Docker Compose for managing multi-container applications.",
                        "Explore best practices for using Docker in development and production."
                    ]
                },
                {
                    title: "Serverless Computing",
                    description: "Understand the principles of serverless architecture and its use cases.",
                    steps: [
                        "Define serverless computing and its advantages.",
                        "Explore serverless services in AWS Lambda, Azure Functions, and Google Cloud Functions.",
                        "Learn about event-driven architectures.",
                        "Implement a simple serverless application using AWS Lambda."
                    ]
                },
                {
                    title: "Infrastructure as Code (Terraform)",
                    description: "Get introduced to Infrastructure as Code (IaC) using Terraform.",
                    steps: [
                        "Understand the concepts of IaC and its benefits.",
                        "Install Terraform and configure your environment.",
                        "Learn about Terraform syntax and resource management.",
                        "Implement basic infrastructure deployment using Terraform."
                    ]
                },
                {
                    title: "Cloud Security",
                    description: "Learn about best practices and tools for securing cloud environments.",
                    steps: [
                        "Understand the shared responsibility model in cloud security.",
                        "Explore security best practices for AWS, Azure, and GCP.",
                        "Learn about identity and access management (IAM) in the cloud.",
                        "Implement monitoring and incident response strategies."
                    ]
                },
                {
                    title: "Cloud Migration",
                    description: "Understand the strategies and processes for migrating to the cloud.",
                    steps: [
                        "Explore the reasons for migrating to the cloud.",
                        "Understand different migration strategies (lift and shift, replatforming, refactoring).",
                        "Learn about tools and services for cloud migration.",
                        "Implement a migration plan for a sample application."
                    ]
                },
                {
                    title: "DevOps and Cloud Deployment",
                    description: "Learn how DevOps practices integrate with cloud deployment strategies.",
                    steps: [
                        "Understand the principles of DevOps and its importance in cloud environments.",
                        "Explore CI/CD pipelines and tools (Jenkins, GitLab CI, Azure DevOps).",
                        "Learn about deploying applications on cloud platforms.",
                        "Implement a CI/CD pipeline for a sample application using cloud services."
                    ]
                }
            ]
        },
        {
            name: "Blockchain Technology",
            resources: [
                {
                    title: "Blockchain Basics",
                    description: "Understand the foundational concepts of blockchain technology.",
                    steps: [
                        "Define blockchain technology and its components.",
                        "Explore how blockchain works, including nodes and ledgers.",
                        "Understand different types of blockchains (public, private, consortium).",
                        "Discuss real-world use cases of blockchain technology."
                    ]
                },
                {
                    title: "Cryptography & Hashing",
                    description: "Learn the cryptographic principles that secure blockchain networks.",
                    steps: [
                        "Understand basic cryptography concepts, including encryption and decryption.",
                        "Learn about hashing functions and their role in blockchain.",
                        "Explore how digital signatures work and their importance in transactions.",
                        "Examine common hashing algorithms used in blockchain (SHA-256, etc.)."
                    ]
                },
                {
                    title: "Ethereum Basics",
                    description: "Get introduced to Ethereum, one of the leading blockchain platforms.",
                    steps: [
                        "Understand the differences between Ethereum and Bitcoin.",
                        "Explore Ethereum's architecture, including nodes and gas.",
                        "Learn about the Ethereum Virtual Machine (EVM).",
                        "Discuss Ethereum's use cases and decentralized finance (DeFi)."
                    ]
                },
                {
                    title: "Smart Contracts",
                    description: "Learn about smart contracts and their applications.",
                    steps: [
                        "Define smart contracts and understand how they operate.",
                        "Explore the benefits of using smart contracts over traditional contracts.",
                        "Learn about the lifecycle of a smart contract.",
                        "Examine use cases for smart contracts in various industries."
                    ]
                },
                {
                    title: "Solidity Programming",
                    description: "Get hands-on experience with Solidity, the primary programming language for Ethereum.",
                    steps: [
                        "Set up a development environment for Solidity.",
                        "Learn the syntax and structure of Solidity programming.",
                        "Explore data types, functions, and modifiers in Solidity.",
                        "Create and deploy a simple smart contract on a local blockchain."
                    ]
                },
                {
                    title: "Consensus Algorithms",
                    description: "Understand the different consensus mechanisms used in blockchain.",
                    steps: [
                        "Define consensus algorithms and their importance in blockchain.",
                        "Explore common consensus mechanisms like Proof of Work (PoW) and Proof of Stake (PoS).",
                        "Learn about hybrid and alternative consensus models.",
                        "Discuss the challenges and solutions related to scalability and security."
                    ]
                },
                {
                    title: "Decentralized Applications (DApps)",
                    description: "Learn how to build and deploy decentralized applications on blockchain networks.",
                    steps: [
                        "Define DApps and their characteristics.",
                        "Explore the architecture of a typical DApp.",
                        "Learn about the tools and frameworks used for DApp development.",
                        "Create and deploy a simple DApp on Ethereum."
                    ]
                },
                {
                    title: "Tokenomics & NFTs",
                    description: "Understand the economics of tokens and the role of NFTs in blockchain.",
                    steps: [
                        "Define tokenomics and its significance in blockchain projects.",
                        "Explore different types of tokens (utility, security, and governance tokens).",
                        "Learn about non-fungible tokens (NFTs) and their use cases.",
                        "Discuss the impact of tokenomics on blockchain project success."
                    ]
                },
                {
                    title: "Blockchain Security",
                    description: "Learn about security best practices and vulnerabilities in blockchain technology.",
                    steps: [
                        "Understand common security threats to blockchain networks.",
                        "Explore techniques for securing smart contracts and DApps.",
                        "Learn about blockchain audits and best practices.",
                        "Discuss incident response strategies for blockchain security breaches."
                    ]
                },
                {
                    title: "Deploying on Testnets/Mainnet",
                    description: "Learn how to deploy smart contracts on test networks and the main Ethereum network.",
                    steps: [
                        "Understand the differences between testnets and mainnet.",
                        "Learn how to deploy a smart contract on Ethereum testnets (Ropsten, Rinkeby, etc.).",
                        "Explore tools for deploying and interacting with smart contracts.",
                        "Discuss the steps for deploying to the Ethereum mainnet."
                    ]
                }
            ]
        },
        {
            name: "Game Development",
            resources: [
                {
                    title: "Game Design Basics",
                    description: "Learn the foundational concepts of game design.",
                    steps: [
                        "Understand the principles of game design.",
                        "Explore different genres of games and their mechanics.",
                        "Learn about storytelling and player engagement.",
                        "Discuss the importance of prototyping and playtesting."
                    ]
                },
                {
                    title: "C# Programming",
                    description: "Get introduced to C#, the primary programming language for Unity.",
                    steps: [
                        "Set up a development environment for C#.",
                        "Learn C# syntax and fundamental programming concepts.",
                        "Explore object-oriented programming principles.",
                        "Write simple scripts to control game behavior."
                    ]
                },
                {
                    title: "Unity Basics",
                    description: "Familiarize yourself with Unity, a popular game development engine.",
                    steps: [
                        "Install Unity and create a new project.",
                        "Explore the Unity interface and its components.",
                        "Learn about game objects, scenes, and prefabs.",
                        "Create a simple game prototype using Unity."
                    ]
                },
                {
                    title: "3D Modeling (Blender)",
                    description: "Learn the basics of 3D modeling using Blender.",
                    steps: [
                        "Install Blender and understand its interface.",
                        "Learn basic modeling techniques to create 3D objects.",
                        "Explore texturing and materials for 3D models.",
                        "Export models for use in Unity."
                    ]
                },
                {
                    title: "Physics & Mechanics in Games",
                    description: "Understand the physics and mechanics that make games realistic.",
                    steps: [
                        "Learn about physics engines and their role in games.",
                        "Explore collision detection and response.",
                        "Understand forces, gravity, and motion in game environments.",
                        "Implement physics-based interactions in Unity."
                    ]
                },
                {
                    title: "Character Animation",
                    description: "Discover how to animate characters for your games.",
                    steps: [
                        "Learn about the principles of animation.",
                        "Explore character rigging and skinning techniques.",
                        "Animate characters using Unity's animation system.",
                        "Create blend trees for smooth character movement."
                    ]
                },
                {
                    title: "Game AI",
                    description: "Get an introduction to artificial intelligence in games.",
                    steps: [
                        "Understand the basics of AI and its applications in games.",
                        "Explore pathfinding algorithms and behavior trees.",
                        "Implement simple AI behaviors in Unity.",
                        "Learn about state machines for character AI."
                    ]
                },
                {
                    title: "Sound Design",
                    description: "Learn the fundamentals of sound design for games.",
                    steps: [
                        "Understand the role of sound in enhancing player experience.",
                        "Explore audio editing software and sound libraries.",
                        "Learn how to integrate sound effects and music into Unity.",
                        "Create audio triggers and manage sound settings in games."
                    ]
                },
                {
                    title: "Mobile Game Development",
                    description: "Discover how to develop games for mobile platforms.",
                    steps: [
                        "Learn about the differences between mobile and PC game development.",
                        "Optimize game performance for mobile devices.",
                        "Explore mobile input methods (touch, tilt, etc.).",
                        "Publish and test your mobile game on Android/iOS."
                    ]
                },
                {
                    title: "Publishing & Monetization",
                    description: "Understand how to publish and monetize your games.",
                    steps: [
                        "Learn about the different platforms for game publishing.",
                        "Explore marketing strategies for your game.",
                        "Understand various monetization models (ads, in-app purchases, etc.).",
                        "Prepare your game for launch and post-launch support."
                    ]
                }
            ]
        },
        { 
            name: "Software Testing", 
            description: "This course covers fundamental and advanced concepts of software testing, including both manual and automated testing techniques. Participants will learn to design test cases, understand different testing methodologies, and explore tools used in the industry.",
            resources: [
                {
                    title: "Introduction to Testing",
                    steps: [
                        "Understand the importance of software testing.",
                        "Explore different types of testing.",
                        "Learn about the software development lifecycle.",
                        "Familiarize with testing roles and responsibilities."
                    ]
                },
                {
                    title: "Manual Testing Basics",
                    steps: [
                        "Define manual testing and its significance.",
                        "Learn how to execute test cases manually.",
                        "Understand defect reporting and tracking.",
                        "Get hands-on with real-world testing scenarios."
                    ]
                },
                {
                    title: "Test Case Design",
                    steps: [
                        "Learn the structure and components of a test case.",
                        "Understand different test case design techniques (e.g., boundary value analysis).",
                        "Practice writing effective test cases.",
                        "Review and refine test cases based on feedback."
                    ]
                },
                {
                    title: "Automation Testing Basics",
                    steps: [
                        "Understand the need for automation in testing.",
                        "Explore different automation tools and frameworks.",
                        "Learn about the scripting languages used in automation.",
                        "Create your first automated test script."
                    ]
                },
                {
                    title: "Selenium WebDriver",
                    steps: [
                        "Install and set up Selenium WebDriver.",
                        "Learn the basic commands and operations in Selenium.",
                        "Automate web applications with Selenium scripts.",
                        "Handle alerts, pop-ups, and dynamic content."
                    ]
                },
                {
                    title: "API Testing (Postman)",
                    steps: [
                        "Understand the basics of API and web services.",
                        "Learn how to use Postman for API testing.",
                        "Create and execute API requests.",
                        "Validate API responses and handle errors."
                    ]
                },
                {
                    title: "Performance Testing",
                    steps: [
                        "Learn the concepts of performance testing.",
                        "Explore various tools for performance testing (e.g., JMeter).",
                        "Create performance test plans and scenarios.",
                        "Analyze performance testing results and metrics."
                    ]
                },
                {
                    title: "Security Testing",
                    steps: [
                        "Understand the basics of security testing.",
                        "Learn common security vulnerabilities (e.g., OWASP Top Ten).",
                        "Explore tools for security testing (e.g., Burp Suite).",
                        "Conduct basic security assessments on applications."
                    ]
                },
                {
                    title: "Continuous Testing in DevOps",
                    steps: [
                        "Understand the concept of continuous testing in the DevOps pipeline.",
                        "Learn how to integrate testing into CI/CD processes.",
                        "Explore tools and frameworks for continuous testing.",
                        "Implement a continuous testing strategy in a sample project."
                    ]
                },
                {
                    title: "Advanced Automation Frameworks",
                    steps: [
                        "Explore advanced automation frameworks (e.g., TestNG, Cucumber).",
                        "Learn about behavior-driven development (BDD).",
                        "Implement test suites and reporting mechanisms.",
                        "Create reusable test scripts and libraries."
                    ]
                }
            ] 
        },
        { 
            name: "Network Engineering", 
            description: "This course provides a comprehensive overview of network engineering, covering essential networking concepts, protocols, and technologies. Students will gain hands-on experience with networking devices and security practices.",
            resources: [
                {
                    title: "Networking Basics",
                    steps: [
                        "Understand fundamental networking concepts.",
                        "Learn about different types of networks (LAN, WAN, etc.).",
                        "Explore networking hardware (routers, switches).",
                        "Get familiar with basic network configuration."
                    ]
                },
                {
                    title: "TCP/IP Protocols",
                    steps: [
                        "Understand the TCP/IP model and its layers.",
                        "Learn about IP addressing and subnetting.",
                        "Explore the functionality of TCP and UDP.",
                        "Configure TCP/IP settings on devices."
                    ]
                },
                {
                    title: "Network Topologies",
                    steps: [
                        "Learn different network topologies (star, mesh, bus, etc.).",
                        "Understand the advantages and disadvantages of each topology.",
                        "Explore real-world applications of network topologies.",
                        "Design a simple network topology using chosen methods."
                    ]
                },
                {
                    title: "Routing & Switching",
                    steps: [
                        "Understand the basics of routing and switching.",
                        "Learn about routing protocols (RIP, OSPF, BGP).",
                        "Explore VLANs and their configurations.",
                        "Practice basic routing and switching commands."
                    ]
                },
                {
                    title: "Cisco IOS Basics",
                    steps: [
                        "Familiarize yourself with Cisco IOS commands.",
                        "Learn how to navigate the Cisco CLI.",
                        "Configure basic device settings (hostname, interfaces).",
                        "Practice common IOS troubleshooting commands."
                    ]
                },
                {
                    title: "Network Security",
                    steps: [
                        "Understand the fundamentals of network security.",
                        "Learn about common threats and vulnerabilities.",
                        "Explore firewall configurations and security policies.",
                        "Implement security best practices in network design."
                    ]
                },
                {
                    title: "WAN Technologies",
                    steps: [
                        "Learn about various WAN technologies (MPLS, VPN, etc.).",
                        "Understand how WANs differ from LANs.",
                        "Explore the design considerations for WAN networks.",
                        "Implement a basic WAN connection using chosen technologies."
                    ]
                },
                {
                    title: "Network Automation",
                    steps: [
                        "Understand the principles of network automation.",
                        "Learn about automation tools and frameworks (Ansible, Puppet).",
                        "Explore scripting basics for network tasks.",
                        "Implement automated network configurations and monitoring."
                    ]
                },
                {
                    title: "SDN & Network Virtualization",
                    steps: [
                        "Understand the concept of Software-Defined Networking (SDN).",
                        "Learn about network virtualization technologies.",
                        "Explore the benefits of SDN in network management.",
                        "Implement a simple SDN-based solution."
                    ]
                },
                {
                    title: "Cloud Networking",
                    steps: [
                        "Understand cloud computing concepts and models.",
                        "Explore cloud networking services (AWS, Azure).",
                        "Learn about security considerations in cloud networks.",
                        "Implement a simple cloud networking solution."
                    ]
                }
            ] 
        },
        { 
            name: "UI/UX Design", 
            description: "This course covers the principles of user interface (UI) and user experience (UX) design. Participants will learn how to create intuitive and engaging designs by understanding user needs and behaviors, as well as the tools and techniques used in the design process.",
            resources: [
                {
                    title: "Design Fundamentals",
                    steps: [
                        "Learn the basic principles of design (contrast, alignment, repetition, proximity).",
                        "Understand color theory and typography.",
                        "Explore layout techniques and grid systems.",
                        "Familiarize yourself with design tools (Adobe XD, Figma)."
                    ]
                },
                {
                    title: "User Research",
                    steps: [
                        "Understand the importance of user research in design.",
                        "Learn different research methods (surveys, interviews, observations).",
                        "Create user personas based on research findings.",
                        "Analyze and synthesize user data to inform design decisions."
                    ]
                },
                {
                    title: "Wireframing",
                    steps: [
                        "Learn the purpose and importance of wireframing.",
                        "Explore tools for wireframing (Balsamiq, Figma).",
                        "Create low-fidelity wireframes for web and mobile interfaces.",
                        "Iterate on wireframes based on feedback."
                    ]
                },
                {
                    title: "Prototyping (Figma, Sketch)",
                    steps: [
                        "Understand the difference between wireframes, mockups, and prototypes.",
                        "Learn how to create interactive prototypes in Figma or Sketch.",
                        "Explore prototyping best practices and techniques.",
                        "Test and refine prototypes based on user feedback."
                    ]
                },
                {
                    title: "User Testing",
                    steps: [
                        "Understand the importance of user testing in the design process.",
                        "Learn how to plan and conduct usability tests.",
                        "Analyze test results and gather insights.",
                        "Iterate on designs based on user feedback."
                    ]
                },
                {
                    title: "Interaction Design",
                    steps: [
                        "Learn the principles of interaction design.",
                        "Understand how users interact with digital interfaces.",
                        "Explore design patterns for effective interaction.",
                        "Create and test interactive elements in your designs."
                    ]
                },
                {
                    title: "Design Systems",
                    steps: [
                        "Understand the components of a design system.",
                        "Learn how to create and document design patterns.",
                        "Explore tools for managing design systems.",
                        "Implement a design system in a real project."
                    ]
                },
                {
                    title: "Accessibility",
                    steps: [
                        "Learn the principles of accessible design.",
                        "Understand WCAG guidelines and standards.",
                        "Explore tools for testing accessibility in designs.",
                        "Create designs that are inclusive and user-friendly for all."
                    ]
                },
                {
                    title: "UI Animation",
                    steps: [
                        "Understand the role of animation in UI design.",
                        "Learn about different types of UI animations.",
                        "Explore tools for creating animations (Adobe After Effects, Framer).",
                        "Incorporate animations into your designs for enhanced user experience."
                    ]
                },
                {
                    title: "Portfolio Building",
                    steps: [
                        "Learn how to curate a strong design portfolio.",
                        "Understand the elements of an effective portfolio presentation.",
                        "Gather and showcase your best design projects.",
                        "Prepare for portfolio reviews and interviews."
                    ]
                }
            ] 
        },
        { 
            name: "Robotics", 
            description: "This course provides a comprehensive introduction to the field of robotics, covering fundamental concepts, programming, and hands-on experience with robotic systems. Participants will learn to design, build, and program robots using various tools and technologies.",
            resources: [
                {
                    title: "Introduction to Robotics",
                    steps: [
                        "Understand the history and evolution of robotics.",
                        "Learn about different types of robots and their applications.",
                        "Explore the components of a robotic system.",
                        "Familiarize yourself with basic robotic terminology."
                    ]
                },
                {
                    title: "Mechanics & Electronics Basics",
                    steps: [
                        "Learn the fundamentals of mechanics in robotics.",
                        "Understand basic electronics components (resistors, capacitors, etc.).",
                        "Explore circuit design and analysis.",
                        "Familiarize yourself with breadboarding and prototyping."
                    ]
                },
                {
                    title: "Robot Kinematics",
                    steps: [
                        "Understand the principles of kinematics in robotics.",
                        "Learn about forward and inverse kinematics.",
                        "Explore motion planning and control concepts.",
                        "Solve kinematics problems for robotic arms."
                    ]
                },
                {
                    title: "Microcontrollers (Arduino)",
                    steps: [
                        "Understand the role of microcontrollers in robotics.",
                        "Learn how to program Arduino boards.",
                        "Explore sensors and actuators with Arduino.",
                        "Build simple robotic projects using Arduino."
                    ]
                },
                {
                    title: "Sensors & Actuators",
                    steps: [
                        "Learn about various types of sensors (IR, ultrasonic, etc.).",
                        "Understand how sensors and actuators work together.",
                        "Explore sensor integration in robotic systems.",
                        "Build projects utilizing different sensors and actuators."
                    ]
                },
                {
                    title: "Programming (Python, C++)",
                    steps: [
                        "Learn the basics of programming in Python and C++.",
                        "Understand how to use programming for robotics applications.",
                        "Explore libraries and frameworks used in robotics programming.",
                        "Implement simple algorithms for robotic control."
                    ]
                },
                {
                    title: "Machine Vision",
                    steps: [
                        "Understand the principles of machine vision.",
                        "Learn about image processing techniques.",
                        "Explore computer vision libraries (OpenCV).",
                        "Implement basic machine vision applications in robotics."
                    ]
                },
                {
                    title: "ROS (Robot Operating System)",
                    steps: [
                        "Understand the architecture of ROS.",
                        "Learn how to set up and configure ROS on your system.",
                        "Explore basic ROS commands and functionalities.",
                        "Build and simulate simple robotic applications using ROS."
                    ]
                },
                {
                    title: "Autonomous Navigation",
                    steps: [
                        "Learn about algorithms for robotic navigation.",
                        "Understand concepts of path planning and obstacle avoidance.",
                        "Explore GPS and localization techniques.",
                        "Implement autonomous navigation in a robotic project."
                    ]
                },
                {
                    title: "Robot Simulation & Testing",
                    steps: [
                        "Understand the importance of simulation in robotics.",
                        "Explore simulation tools (Gazebo, V-REP).",
                        "Learn how to create and test robotic models in simulation.",
                        "Conduct experiments and refine robotic designs using simulation."
                    ]
                }
            ] 
        },
        { 
            name: "Business Analytics", 
            description: "This course explores the fundamentals of business analytics, focusing on data analysis, visualization, and decision-making. Participants will learn how to use analytical tools and techniques to drive business strategy and improve outcomes.",
            resources: [
                {
                    title: "Introduction to Business Analytics",
                    steps: [
                        "Understand the key concepts and importance of business analytics.",
                        "Learn about the data analytics lifecycle.",
                        "Explore different types of analytics (descriptive, diagnostic, predictive, prescriptive).",
                        "Familiarize yourself with real-world applications of business analytics."
                    ]
                },
                {
                    title: "Data Analysis with Excel",
                    steps: [
                        "Learn essential Excel functions for data analysis.",
                        "Understand how to manipulate and clean data using Excel.",
                        "Explore pivot tables and data visualization techniques in Excel.",
                        "Analyze and interpret data to derive actionable insights."
                    ]
                },
                {
                    title: "SQL for Business",
                    steps: [
                        "Understand the basics of SQL and its importance in business analytics.",
                        "Learn how to write SQL queries to extract and manipulate data.",
                        "Explore advanced SQL functions for data analysis.",
                        "Practice with real-world business data sets."
                    ]
                },
                {
                    title: "Data Visualization (Tableau)",
                    steps: [
                        "Learn the principles of effective data visualization.",
                        "Explore how to use Tableau to create interactive dashboards.",
                        "Understand how to connect Tableau to different data sources.",
                        "Analyze and visualize business data using Tableau."
                    ]
                },
                {
                    title: "Statistical Analysis",
                    steps: [
                        "Understand the fundamentals of statistical analysis in business.",
                        "Learn how to apply descriptive and inferential statistics.",
                        "Explore hypothesis testing and confidence intervals.",
                        "Use statistical software to conduct analyses on business data."
                    ]
                },
                {
                    title: "Predictive Modeling",
                    steps: [
                        "Learn the basics of predictive modeling and its applications.",
                        "Understand different modeling techniques (regression, classification).",
                        "Explore the use of historical data for making predictions.",
                        "Develop and validate predictive models using real-world data."
                    ]
                },
                {
                    title: "Big Data in Business",
                    steps: [
                        "Understand what constitutes big data and its significance.",
                        "Explore big data technologies and tools (Hadoop, Spark).",
                        "Learn how to analyze and derive insights from large data sets.",
                        "Examine case studies of big data applications in business."
                    ]
                },
                {
                    title: "Data-Driven Decision Making",
                    steps: [
                        "Learn how to use data to inform business decisions.",
                        "Understand the importance of a data-driven culture in organizations.",
                        "Explore case studies showcasing successful data-driven strategies.",
                        "Develop skills to communicate data insights to stakeholders."
                    ]
                },
                {
                    title: "Business Intelligence Tools",
                    steps: [
                        "Explore various business intelligence tools and their functionalities.",
                        "Learn how to implement BI solutions in an organization.",
                        "Understand how to analyze and visualize business performance.",
                        "Compare different BI tools based on their features and use cases."
                    ]
                },
                {
                    title: "Case Studies & Capstone Projects",
                    steps: [
                        "Apply business analytics concepts to real-world scenarios.",
                        "Work on case studies to develop practical analytical skills.",
                        "Collaborate with peers on capstone projects to solve business problems.",
                        "Present findings and recommendations based on your analysis."
                    ]
                }
            ] 
        },
        { 
            name: "Augmented Reality (AR)", 
            description: "This course introduces participants to the world of augmented reality, covering both the technical and creative aspects of AR development. Students will learn how to design and build AR experiences using industry-standard tools and platforms.",
            resources: [
                {
                    title: "Introduction to AR",
                    steps: [
                        "Understand the fundamentals of augmented reality.",
                        "Learn about the history and evolution of AR technologies.",
                        "Explore the different applications of AR in various industries.",
                        "Familiarize yourself with the hardware and software components of AR systems."
                    ]
                },
                {
                    title: "Unity for AR",
                    steps: [
                        "Learn how to use Unity as a development platform for AR.",
                        "Explore the AR Foundation framework for building cross-platform AR applications.",
                        "Understand how to import and manage 3D assets in Unity.",
                        "Create simple AR experiences using Unity."
                    ]
                },
                {
                    title: "ARKit for iOS",
                    steps: [
                        "Understand the capabilities of ARKit for iOS development.",
                        "Learn how to set up ARKit projects in Xcode.",
                        "Explore key features of ARKit (plane detection, lighting estimation).",
                        "Develop and test AR applications for iOS devices."
                    ]
                },
                {
                    title: "ARCore for Android",
                    steps: [
                        "Understand the capabilities of ARCore for Android development.",
                        "Learn how to integrate ARCore into Android projects.",
                        "Explore ARCore features such as environmental understanding and light estimation.",
                        "Build and deploy AR applications for Android devices."
                    ]
                },
                {
                    title: "3D Modeling for AR",
                    steps: [
                        "Learn the basics of 3D modeling for augmented reality.",
                        "Explore popular 3D modeling software (Blender, Maya).",
                        "Understand how to optimize 3D models for AR applications.",
                        "Create and export 3D assets for use in AR experiences."
                    ]
                },
                {
                    title: "Lighting & Effects in AR",
                    steps: [
                        "Understand the role of lighting in augmented reality.",
                        "Learn how to implement realistic lighting effects in AR applications.",
                        "Explore the use of shaders and visual effects in AR.",
                        "Experiment with lighting settings to enhance user experience."
                    ]
                },
                {
                    title: "Marker-Based Tracking",
                    steps: [
                        "Learn how marker-based tracking works in AR.",
                        "Understand how to create and implement tracking markers.",
                        "Explore applications of marker-based tracking in AR experiences.",
                        "Develop projects using marker-based tracking techniques."
                    ]
                },
                {
                    title: "Markerless AR",
                    steps: [
                        "Understand the concept of markerless AR and its advantages.",
                        "Explore technologies used in markerless tracking (GPS, IMU).",
                        "Learn how to implement markerless AR applications.",
                        "Develop projects that utilize markerless tracking."
                    ]
                },
                {
                    title: "AR UI/UX",
                    steps: [
                        "Learn about the principles of user interface and user experience design for AR.",
                        "Understand how to create intuitive and engaging AR interfaces.",
                        "Explore best practices for AR UI/UX design.",
                        "Test and iterate on AR interface designs based on user feedback."
                    ]
                },
                {
                    title: "Publishing AR Applications",
                    steps: [
                        "Understand the process of publishing AR applications on different platforms.",
                        "Learn about app store requirements and guidelines.",
                        "Explore marketing strategies for AR applications.",
                        "Publish your AR projects on iOS and Android platforms."
                    ]
                }
            ] 
        },
        { 
            name: "Virtual Reality (VR)", 
            description: "This course provides a comprehensive introduction to virtual reality technology and its applications. Students will learn to design, develop, and optimize VR experiences using industry-standard tools and platforms.",
            resources: [
                {
                    title: "Introduction to VR",
                    steps: [
                        "Understand the fundamentals of virtual reality technology.",
                        "Explore the history and evolution of VR.",
                        "Learn about different types of VR experiences (immersive, non-immersive).",
                        "Familiarize yourself with VR hardware and software."
                    ]
                },
                {
                    title: "Unity for VR",
                    steps: [
                        "Learn how to use Unity as a platform for VR development.",
                        "Explore VR-specific features in Unity (XR toolkit, VR templates).",
                        "Understand how to create VR environments using Unity.",
                        "Develop basic VR applications and experiences."
                    ]
                },
                {
                    title: "VR Interaction Design",
                    steps: [
                        "Understand the principles of interaction design in virtual reality.",
                        "Learn about user interface design for VR environments.",
                        "Explore gesture-based and controller-based interactions.",
                        "Create intuitive interactions for VR applications."
                    ]
                },
                {
                    title: "VR Headset Integration",
                    steps: [
                        "Learn how to integrate various VR headsets with Unity.",
                        "Understand headset-specific features and capabilities.",
                        "Explore methods for optimizing VR experiences for different devices.",
                        "Test and troubleshoot headset integration issues."
                    ]
                },
                {
                    title: "3D Modeling for VR",
                    steps: [
                        "Understand the basics of 3D modeling for VR applications.",
                        "Explore popular 3D modeling software (Blender, Maya).",
                        "Learn how to optimize 3D models for performance in VR.",
                        "Import and use 3D assets in Unity for VR."
                    ]
                },
                {
                    title: "360-Degree Video",
                    steps: [
                        "Learn about the production of 360-degree video content.",
                        "Understand the difference between 360-degree video and traditional video.",
                        "Explore tools and techniques for editing 360-degree videos.",
                        "Create and publish your own 360-degree video project."
                    ]
                },
                {
                    title: "VR Performance Optimization",
                    steps: [
                        "Understand the importance of performance optimization in VR.",
                        "Learn techniques for optimizing VR applications for better performance.",
                        "Explore profiling tools available in Unity.",
                        "Implement optimization strategies to enhance user experience."
                    ]
                },
                {
                    title: "Immersive Sound Design",
                    steps: [
                        "Understand the role of sound in creating immersive VR experiences.",
                        "Learn about spatial audio and its applications in VR.",
                        "Explore tools for designing and implementing sound in Unity.",
                        "Create a sound design that enhances the VR experience."
                    ]
                },
                {
                    title: "User Testing in VR",
                    steps: [
                        "Learn about the methods and importance of user testing in VR.",
                        "Understand how to gather and analyze user feedback.",
                        "Conduct user testing sessions to evaluate VR experiences.",
                        "Iterate on designs based on user testing results."
                    ]
                },
                {
                    title: "Publishing VR Applications",
                    steps: [
                        "Understand the process of publishing VR applications on different platforms.",
                        "Learn about the requirements and guidelines for VR app stores.",
                        "Explore marketing strategies for VR applications.",
                        "Publish your VR project on platforms like Oculus Store or Steam."
                    ]
                }
            ] 
        },
        { 
            name: "Internet of Things (IoT)", 
            description: "This course introduces the concepts and technologies behind the Internet of Things. Participants will learn to design and implement IoT systems using various hardware and software tools, focusing on real-world applications.",
            resources: [
                {
                    title: "Introduction to IoT",
                    steps: [
                        "Understand the fundamentals of IoT and its impact on industries.",
                        "Explore the architecture and components of IoT systems.",
                        "Learn about the various applications of IoT in everyday life.",
                        "Familiarize yourself with IoT communication models."
                    ]
                },
                {
                    title: "Microcontrollers (Arduino, Raspberry Pi)",
                    steps: [
                        "Learn the basics of microcontrollers and their role in IoT.",
                        "Explore how to set up and program Arduino and Raspberry Pi.",
                        "Understand how to connect sensors and actuators to microcontrollers.",
                        "Develop simple projects using microcontrollers."
                    ]
                },
                {
                    title: "Sensors & Actuators",
                    steps: [
                        "Understand the function of sensors and actuators in IoT.",
                        "Explore different types of sensors (temperature, humidity, motion).",
                        "Learn how to interface sensors and actuators with microcontrollers.",
                        "Develop projects that utilize sensors and actuators."
                    ]
                },
                {
                    title: "IoT Networking Protocols",
                    steps: [
                        "Learn about various networking protocols used in IoT (MQTT, CoAP).",
                        "Understand the importance of network security in IoT.",
                        "Explore how to set up IoT networks for data communication.",
                        "Implement protocols in practical IoT applications."
                    ]
                },
                {
                    title: "Cloud Integration",
                    steps: [
                        "Understand the role of cloud computing in IoT.",
                        "Learn how to connect IoT devices to cloud platforms.",
                        "Explore cloud services for data storage and analysis.",
                        "Develop IoT applications that leverage cloud integration."
                    ]
                },
                {
                    title: "Data Processing",
                    steps: [
                        "Learn the basics of data processing in IoT systems.",
                        "Understand how to collect, store, and analyze IoT data.",
                        "Explore data visualization techniques for IoT data.",
                        "Implement data processing solutions for real-time analytics."
                    ]
                },
                {
                    title: "IoT Security",
                    steps: [
                        "Understand the importance of security in IoT systems.",
                        "Explore common security vulnerabilities and threats in IoT.",
                        "Learn about security best practices for IoT devices.",
                        "Implement security measures in IoT applications."
                    ]
                },
                {
                    title: "Edge Computing",
                    steps: [
                        "Understand the concept of edge computing in IoT.",
                        "Explore the benefits of processing data at the edge.",
                        "Learn about edge devices and their functionalities.",
                        "Implement edge computing solutions for IoT applications."
                    ]
                },
                {
                    title: "IoT Data Analytics",
                    steps: [
                        "Learn about the importance of data analytics in IoT.",
                        "Explore tools and techniques for IoT data analysis.",
                        "Understand how to derive insights from IoT data.",
                        "Implement data analytics solutions in IoT projects."
                    ]
                },
                {
                    title: "Industrial IoT Applications",
                    steps: [
                        "Explore the applications of IoT in industrial settings.",
                        "Learn about smart manufacturing and automation.",
                        "Understand the challenges and solutions in industrial IoT.",
                        "Develop an industrial IoT project to address real-world problems."
                    ]
                }
            ] 
        },
        {
            name: "Big Data",
            description: "This course provides a comprehensive introduction to Big Data technologies and methodologies. Participants will learn how to manage, process, and analyze large datasets using various tools and frameworks in the Big Data ecosystem.",
            resources: [
                {
                    title: "Introduction to Big Data",
                    steps: [
                        "Understand the definition and characteristics of Big Data.",
                        "Explore the significance and applications of Big Data in various industries.",
                        "Learn about the challenges and opportunities presented by Big Data.",
                        "Familiarize yourself with the data lifecycle in Big Data environments."
                    ]
                },
                {
                    title: "Hadoop Ecosystem",
                    steps: [
                        "Learn the fundamentals of the Hadoop framework and its components.",
                        "Explore Hadoop Distributed File System (HDFS) and its architecture.",
                        "Understand the role of MapReduce in processing Big Data.",
                        "Familiarize yourself with Hadoop tools like Pig, Hive, and HBase."
                    ]
                },
                {
                    title: "Data Ingestion & ETL",
                    steps: [
                        "Understand the processes of data ingestion and ETL (Extract, Transform, Load).",
                        "Learn about tools and techniques for data ingestion from various sources.",
                        "Explore data transformation methods for cleaning and preparing data.",
                        "Implement ETL pipelines using tools like Apache Nifi or Talend."
                    ]
                },
                {
                    title: "Spark Basics",
                    steps: [
                        "Understand the fundamentals of Apache Spark and its architecture.",
                        "Explore the differences between Spark and Hadoop MapReduce.",
                        "Learn about Spark's Resilient Distributed Datasets (RDDs) and DataFrames.",
                        "Develop simple applications using Spark's core APIs."
                    ]
                },
                {
                    title: "Data Storage (HDFS)",
                    steps: [
                        "Learn about the structure and features of Hadoop Distributed File System (HDFS).",
                        "Understand how data is stored and retrieved in HDFS.",
                        "Explore the benefits of HDFS for Big Data storage.",
                        "Implement file operations in HDFS using command-line interface."
                    ]
                },
                {
                    title: "Data Warehousing",
                    steps: [
                        "Understand the concept and architecture of data warehousing.",
                        "Explore data warehousing solutions and technologies.",
                        "Learn about the differences between data warehousing and data lakes.",
                        "Implement data warehousing concepts in a practical project."
                    ]
                },
                {
                    title: "Data Analysis with Spark",
                    steps: [
                        "Learn how to perform data analysis using Apache Spark.",
                        "Explore Spark SQL for querying structured data.",
                        "Understand how to use Spark MLlib for machine learning tasks.",
                        "Implement data analysis projects using Spark."
                    ]
                },
                {
                    title: "NoSQL Databases (MongoDB, Cassandra)",
                    steps: [
                        "Understand the principles and advantages of NoSQL databases.",
                        "Explore MongoDB and Cassandra, two popular NoSQL databases.",
                        "Learn how to model data in NoSQL databases.",
                        "Implement CRUD operations and queries in MongoDB and Cassandra."
                    ]
                },
                {
                    title: "Machine Learning on Big Data",
                    steps: [
                        "Understand the integration of machine learning with Big Data technologies.",
                        "Explore machine learning algorithms and their applications on large datasets.",
                        "Learn about Spark MLlib and its features for machine learning.",
                        "Implement machine learning models using Big Data frameworks."
                    ]
                },
                {
                    title: "Data Visualization for Big Data",
                    steps: [
                        "Learn the importance of data visualization in Big Data analytics.",
                        "Explore tools and techniques for visualizing large datasets.",
                        "Understand how to communicate insights effectively through visualization.",
                        "Implement visualization projects using tools like Tableau or Power BI."
                    ]
                }
            ]
        }
    ];

    // Find the selected interest
    const selectedInterestData = interestsData.find(interest =>
        interest.name.toLowerCase() === selectedInterest.toLowerCase()
    );

    return (
        <>
    <div style={{
        padding: '20px',
        maxWidth: '1200px',
        margin: 'auto',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    }}>
        <h2 style={{
            color: '#333',
            fontSize: '28px',
            fontWeight: '600',
            textAlign: 'center',
            marginBottom: '20px',
        }}>
            Learning Roadmap for: <span style={{ color: '#d63384' }}>{selectedInterest}</span>
        </h2>
        {selectedInterestData ? (
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: selectedInterestData.resources.length % 3 === 1 ? 'center' : 'space-between',
                gap: '20px',
            }}>
                {selectedInterestData.resources.map((resource, index) => (
                    <div key={index} style={{
                        flex: '1 1 calc(30% - 20px)',
                        padding: '20px',
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        position: 'relative'
                    }} 
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.25)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.15)';
                    }}>
                        <h3 style={{
                            color: '#d63384',
                            fontSize: '22px',
                            fontWeight: '600',
                            marginBottom: '10px',
                        }}>{resource.title}</h3>
                        <p style={{
                            color: '#555',
                            fontSize: '16px',
                            marginBottom: '15px',
                        }}>{resource.description}</p>
                        <h4 style={{
                            color: '#777',
                            fontSize: '18px',
                            marginBottom: '10px',
                        }}>Learning Steps:</h4>
                        <ol style={{
                            paddingLeft: '20px',
                            listStyleType: 'none',
                        }}>
                            {resource.steps.map((step, stepIndex) => (
                                <li key={stepIndex} style={{
                                    marginBottom: '10px',
                                    position: 'relative',
                                    paddingLeft: '20px',
                                }}>
                                    <span style={{
                                        position: 'absolute',
                                        left: '0',
                                        top: '6px',
                                        width: '8px',
                                        height: '8px',
                                        backgroundColor: '#d63384', // Danger color for bullet points
                                        borderRadius: '50%',
                                    }}></span>
                                    {step}
                                </li>
                            ))}
                        </ol>
                    </div>
                ))}
            </div>
        ) : (
            <p style={{
                color: '#999',
                fontSize: '16px',
                textAlign: 'center',
                margin: '20px 0',
            }}>
                No resources found for this interest.
            </p>
        )}
    </div>
    <hr style={{ border: '0.5px solid #ddd', margin: '30px 0' }} />
</>

    );
};

export default InterestList;
