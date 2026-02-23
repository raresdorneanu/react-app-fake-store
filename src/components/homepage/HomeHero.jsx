import HomeHeroText from './hero/HomeHeroText'
import HomeHeroCard from './hero/HomeHeroCard'
import HeroFloatingCard from './hero/HeroFloatingCard'

const HomeHero = () => {
    return (
        <div className='home-hero'>
            <section className="section section-hero">
                <div className="container">
                    <div className="hero-layout">
                        <HomeHeroText />
                        <div className="hero-visual">
                            <HomeHeroCard />
                            <HeroFloatingCard />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default HomeHero
