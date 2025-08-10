import Layout from "@/components/common/MainLayout";
import "./index.scss";
import DetailCard from "@/components/common/detailCard/detailCard";
import ImageText from "@/components/common/image-text-combo/image-text-combo";

const data = [
    {
        title: "Written Language",
        data: "Developing communication skills through reading, writing, and storytelling.",
    },
    {
        title: "Mathematics",
        data: "Building a strong foundation in numeracy, problem-solving, and logical thinking.",
    },
    {
        title: "Social Learning",
        data: "Cultivating emotional intelligence, teamwork, and respect for others.",
    },
    {
        title: "Music and Arts",
        data: "Encouraging creativity and expression through music, movement, and visual arts.",
    },
    {
        title: "Environmental Studies",
        data: "Instilling a sense of wonder and responsibility for the natural world.",
    }
];

const Component = () => {
    return <Layout header="Transitional Kindergarten / Kindergarten">
        <div className="tkMain">
            <div className="tk-header">
                <div className="container">
                    <h3>
                        RSMS is accepting applications for <b>grades TK-8.</b>
                    </h3>
                    <h3>
                        For the 2025/26 school year, <b>TK (transitional kindergarten)</b>{" "}
                        students must turn 4 by Sept. 1, 2025;{" "}
                        <b>kindergarten students</b> turn 5 by Sept. 1.
                    </h3>
                    <h5>RSMS does not have a pre-school program.</h5>
                </div>
            </div>
            <div className="tkDetail">
                <div className="container">
                    <p>At Rising Sun Montessori, our youngest students grow, learn, and thrive in a unique and nurturing environment that lays the foundation for a lifelong love of learning.
                        <br /><br />
                        Our Transitional Kindergarten/Kindergarten (TK/K) program is the cornerstone of our school, designed to honor the individuality of each child. Through the Montessori Method, we embrace the unique learning styles and needs of every student, creating a personalized experience that fosters confidence, independence, and curiosity.</p>

                    <div>
                        <h1>
                            The Learning Environment
                        </h1>
                        <p>In our Montessori classroom, your child will have the time and support to progress at their own pace, mastering skills and concepts through hands-on, developmentally appropriate activities. Rather than rushing through a variety of tasks, we emphasize depth over breadth, allowing children to fully engage with and master each activity.</p>


                        <br />
                        {data.map((item: any, index: number) => (
                            <DetailCard key={index} title={item.title} data={item.data} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </Layout>
}

export default Component;