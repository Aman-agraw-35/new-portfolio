import { motion } from "framer-motion";
import { Card, CardContent } from "../components/ui/card";

export function AchievementsSection() {
  const achievements = [
    {
      title: "2nd Place - Hack-O-Sprint 2.0",
      description:
        "Secured 2nd position among 50 teams at Hack-O-Sprint 2.0, an internal hackathon for SIH 2024.",
      date: "Oct 2024",
    },
    {
      title: "3rd Place - Ideathon’23",
      description:
        "Achieved 3rd place at Ideathon’23,a hackathon conducted by GDSC IIIT Bhopal.",
      date: "Feb 2023",
    },
    {
      title: "Cracked JEE MAINS 2022",
      description:
        "Qualified JEE MAINS among 1 million registered candidates, securing admission to IIIT Bhopal.",
      date: "2022",
    },
    {
      title: "DSA & CP Achievements",
      description:
        "Solved 450+ problems on LeetCode, 320+ problems on GeeksForGeeks, 80+ problems on CodeChef, and completed Striver's A2Z DSA Course (100%).",
      date: "2025",
    },
    {
      title: "Super Contributor - hacktoberfest 2025",
      description:
        "Earned 'Super Contributor' badge by and contributed to real-world open-source projects during Hacktoberfest 2025. A tree planted in my name! and received a limited-edition T-shirt.",
      date: "Oct 2025",
    }
  ];

  return (
    <section id="achievements" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12"
        >
          Achievements
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="space-y-6">
            {achievements.slice(0, Math.ceil(achievements.length / 2)).map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card>
                  <CardContent className="p-4 bg-background rounded-lg shadow-md border-l-4 border-primary">
                    <h3 className="text-xl font-semibold">{achievement.title}</h3>
                    <p className="text-muted-foreground">{achievement.description}</p>
                    <span className="text-sm text-foreground/70">{achievement.date}</span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {achievements.slice(Math.ceil(achievements.length / 2)).map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card>
                  <CardContent className="p-4 bg-background rounded-lg shadow-md border-l-4 border-primary">
                    <h3 className="text-xl font-semibold">{achievement.title}</h3>
                    <p className="text-muted-foreground">{achievement.description}</p>
                    <span className="text-sm text-foreground/70">{achievement.date}</span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
