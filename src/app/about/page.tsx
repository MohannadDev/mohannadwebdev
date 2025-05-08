import AnimatedText from '@/components/AnimatedText';
// import Image from 'next/image';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="min-h-screen px-4 py-20">
      <div className="max-w-5xl mx-auto">
        <AnimatedText 
          text="About Me" 
          className="mb-16 text-4xl font-bold text-center md:text-6xl" 
        />
        
        <div className="flex flex-col items-center gap-12 md:flex-row md:items-start">
          <div className="flex justify-center md:w-1/3">
            <div className="relative w-64 h-64 overflow-hidden rounded-xl">
              {/* Replace with your actual image */}
              <div className="absolute inset-0 flex items-center justify-center text-xl bg-gray-300 dark:bg-gray-700">
                Your Photo
              </div>
            </div>
          </div>
          
          <div className="md:w-2/3">
            <h2 className="mb-4 text-2xl font-bold">Who I Am</h2>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              Hi, I&apos;m a passionate full-stack developer based in [Your Location]. 
              I specialize in building modern, responsive web applications that provide 
              exceptional user experiences. With a strong foundation in both front-end 
              and back-end technologies, I create seamless, efficient solutions for 
              complex problems.
            </p>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              My journey in web development started [X] years ago, and I&apos;ve been 
              continuously learning and adapting to new technologies. I&apos;m particularly 
              interested in React, Next.js, and modern JavaScript, which allow me to
              build fast, accessible, and maintainable applications.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Beyond coding, I enjoy [Your Hobbies/Interests]. I believe these activities 
              help me approach problems from different angles and keep my creative thinking 
              sharp.
            </p>
          </div>
        </div>
        
        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-bold text-center">My Experience</h2>
          <div className="space-y-8">
            {/* Experience item 1 */}
            <motion.div 
              className="p-6 bg-white shadow-lg dark:bg-gray-800 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col justify-between mb-4 md:flex-row md:items-center">
                <h3 className="text-xl font-bold">Senior Developer</h3>
                <div className="font-medium text-blue-600">2022 - Present</div>
              </div>
              <h4 className="mb-2 font-medium text-gray-700 dark:text-gray-300">Company Name</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Led development of multiple web applications using React and Next.js.
                Implemented CI/CD pipelines and improved site performance by 40%.
                Mentored junior developers and collaborated with cross-functional teams.
              </p>
            </motion.div>
            
            {/* Experience item 2 */}
            <motion.div 
              className="p-6 bg-white shadow-lg dark:bg-gray-800 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col justify-between mb-4 md:flex-row md:items-center">
                <h3 className="text-xl font-bold">Web Developer</h3>
                <div className="font-medium text-blue-600">2019 - 2022</div>
              </div>
              <h4 className="mb-2 font-medium text-gray-700 dark:text-gray-300">Previous Company</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Developed and maintained client websites using React and Node.js.
                Collaborated with designers to implement responsive, accessible UI.
                Participated in code reviews and improved code quality standards.
              </p>
            </motion.div>
          </div>
        </div>
        
        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-bold text-center">Education</h2>
          <motion.div 
            className="p-6 bg-white shadow-lg dark:bg-gray-800 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col justify-between mb-4 md:flex-row md:items-center">
              <h3 className="text-xl font-bold">Bachelor&apos;s in Computer Science</h3>
              <div className="font-medium text-blue-600">2015 - 2019</div>
            </div>
            <h4 className="mb-2 font-medium text-gray-700 dark:text-gray-300">University Name</h4>
            <p className="text-gray-600 dark:text-gray-400">
              Focused on web development and software engineering. 
              Participated in hackathons and coding competitions.
              Graduated with honors and received the Outstanding Student award.
            </p>
          </motion.div>
        </div>
        
        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-bold text-center">Skills & Technologies</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 
              'HTML5', 'CSS3', 'Tailwind CSS', 'Git'].map((skill, index) => (
              <motion.div 
                key={index}
                className="p-3 text-center bg-white rounded-lg shadow dark:bg-gray-800"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 