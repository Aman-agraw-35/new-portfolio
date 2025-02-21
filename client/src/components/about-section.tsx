import { motion } from "framer-motion";
import ReactPlayer from "react-player";
import { Card, CardContent } from "@/components/ui/card";

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12"
        >
          About Me
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardContent className="p-4 aspect-video">
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-NFmiJPjIoJ6_4y7I-gwZo5dTD41GRMYFKQ&s" 
                  alt="Description of image" 
                  className="w-full h-full object-cover rounded-lg"
                />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-semibold">My Journey</h3>
            <p className="text-muted-foreground">
              I'm Aman Agrawal, a student at IIIT Bhopal with a CGPA of 8.56 and a strong academic foundation, having cleared IIT JEE. I specialize in full-stack web development with expertise in the MERN stack, Next.js, and DevOps. Additionally, I am proficient in Data Structures and Algorithms (DSA) and actively participate in competitive programming. My technical skills, problem-solving abilities, and continuous learning mindset drive me to excel in software development.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
