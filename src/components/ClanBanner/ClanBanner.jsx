function ClanBanner({ info }) {
    return (
        info && (
        <div>
            <h2>{`${info.name}(${info.tag})`}</h2>
            <p>Level: {info.level}</p>
            <img src={info.badge} alt={"clan badge"}/>
        </div>
        )
    )
}

export default ClanBanner