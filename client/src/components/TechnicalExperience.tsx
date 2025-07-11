import { motion } from "framer-motion";
import { Card, CardContent } from "../components/ui/card";

export function TechnicalExperience() {
  const experiences = [
    {
      role: "Event Coordinator",
      company: "Google Developers Student Clubs, IIIT Bhopal",
      duration: "Sept 2023 - Sept 2024",
      details: [
        "Led 9+ events & workshops on Google technologies.",
        "Collaborated with 25+ members to foster innovation.",
      ],
    },
    {
      role: "Full Stack Web Development Intern",
      company: "Next Step Veteran Pvt. Ltd.",
      duration: "May 2024 - Jul 2024",
      details: [
        "Developed 5+ responsive web pages with React, Next.js.",
        "Worked with a 5-member team, delivering 2 major projects.",
      ],
    },
    {
      role: "Web Development Lead",
      company: "Aarzoo, IIIT Bhopal",
      duration: "2024 - 2025",
      details: ["Leading web development for Aarzoo, IIIT Bhopal."],
    },
  ];

  return (
    <section className="container mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Technical Experience</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <Card>
              <CardContent className="p-6 bg-background rounded-lg shadow-md border-l-4 border-primary">
                <h3 className="text-xl font-semibold">{exp.role}</h3>
                <p className="text-muted-foreground">{exp.company} • {exp.duration}</p>
                <ul className="mt-2 list-disc list-inside text-muted-foreground">
                  {exp.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
