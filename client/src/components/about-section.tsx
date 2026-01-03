import { motion } from "framer-motion";
import ReactPlayer from "react-player";
import { Card, CardContent } from "../components/ui/card";

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
           Hi, I'm Aman Agrawal, a final-year B.Tech student at IIIT Bhopal (CGPA: 8.72) with strong interests in full-stack development, Generative AI, and DevOps. I have a solid competitive programming background (Codeforces Expert, LeetCode Knight, CodeChef 4★) with 800+ DSA and CP problems solved. I've built and deployed production-grade projects like Guns-Mart (Next.js, Docker, Jenkins, NGINX, AWS), Ghost-AI (GenAI chatbot with live search and persistent memory), and DockStream (CI/CD automation with monitoring using Prometheus and Grafana), along with open-source contributions to Profocto and Opsimate. My tech stack includes C++, Python, JavaScript/TypeScript, MERN, Next.js, FastAPI, MongoDB, Docker, CI/CD pipelines, and AWS, and I enjoy building scalable systems through hands-on learning and problem-solving.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
