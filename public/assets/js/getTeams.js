$(document).ready(function () {
	const urlParams = new URLSearchParams(window.location.search);
	const team_name = urlParams.get("team");

	getTeams = async () => {
		const response = await fetch("/teams-data", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		});
		const teams = await response.json();
		return await teams;
	};
	getTeams().then((response) => {
		const display_team = response[team_name];

		display_team.forEach((el) => {
			let card = `
                <article class="team__member">
                    <div class="team__member-image">
                        <img src="/teams-img/${el.image}" alt="Team Member Image">
                    </div>
                    <div class="team__member-info">
                        <h4 class="font-semibold">${el.name}</h4>
                        <p>${el.title}</p>
                    </div>
                    <div class="team__member-socials">
                        <a href="${el.instagram}" target="_blank">
                            <i class="uil uil-instagram"></i>
                        </a>
                        <a href="${el.facebook}" target="_blank">
                            <i class="uil uil-facebook"></i>
                        </a>
                        <a href="${el.linkedin}" target="_blank">
                            <i class="uil uil-linkedin"></i>
                        </a>
                    </div>
                </article>
            `;
			$("#team_cont").append(card);
		});
	});
});
