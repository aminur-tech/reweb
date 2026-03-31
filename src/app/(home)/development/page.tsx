import DevHero from '@/components/development/DevHero';
import DevProjects from '@/components/development/DevProjects';
import Services from '@/components/development/Services';
import Skills from '@/components/development/Skills';
import Workflow from '@/components/development/Workflow';
import Testimonials from '@/components/development/Testimonials';
import Contact from '@/components/contact/Contact';


const Development = () => {
    return (
        <div>
            <DevHero/>
            <Services/>
            <Skills/>
            <Workflow/>
            <DevProjects/>
            <Testimonials/>
            <Contact/>
        </div>
    );
};

export default Development;