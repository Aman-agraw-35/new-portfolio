import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const projects = [
  {
    title: "Chat Application",
    description: "Real-time chat application built with MERN stack",
    image: "https://img.freepik.com/premium-vector/chat-app-logo-design-template-can-be-used-icon-chat-application-logo_605910-1724.jpg",
    link: "https://github.com/Aman-agraw-35/mernchat-app",
    category: "web",
  },
  {
    title: "Smart India Hackathon",
    description: "Project developed for Smart India Hackathon 2024",
    image: "https://i.ytimg.com/vi/znMbKz6ZPno/maxresdefault.jpg",
    link: "https://github.com/Aman-agraw-35/SmartIndiaHackathon-2k24",
    category: "web",
  },
  {
    title: "Gunsmart",
    description: "E-commerce platform for hunting equipment",
    image: "https://static.wixstatic.com/media/8d1f6c_ae1eab54af5a4a409036fed18dda5efc.jpg",
    link: "https://github.com/Aman-agraw-35/Gunsmart",
    category: "web",
  },
  {
    title: "Ghost Games",
    description: "Gaming platform project",
    image: "https://moewalls.com/wp-content/uploads/2023/01/ghost-call-of-duty-modern-warfare-ii-thumb-728x410.jpg",
    link: "https://github.com/Aman-agraw-35/GHOST-GAMES-",
    category: "web",
  },
  {
    title: "Jan Sahayata",
    description: "Google's Solutions Challenge 2024 Project",
    image: "https://curlytales.com/wp-content/uploads/2020/04/Dubai-based-charities-distribute-over-31570-daily-meals-to-underprivileged-people.png",
    link: "https://github.com/Aman-agraw-35/SOLUTIONS-CHALLENGE-24-PROJECT",
    category: "web",
  },
  {
    title: "Google Keep Clone",
    description: "A clone of Google's note-taking application",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwX8l9SlO0FrYJ-_BoZVAMNAavApyQyzWcBw&s",
    link: "https://github.com/Aman-agraw-35/Google-keep-clone",
    category: "web",
  }
];

const categories = ["all", "web", "mobile"];

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects = projects.filter(
    (project) => activeCategory === "all" || project.category === activeCategory
  );

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12"
        >
          My Projects
        </motion.h2>

        <div className="flex justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{project.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
