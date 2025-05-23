class Terminal {
    constructor() {
        this.terminal = document.getElementById('terminal');
        this.prompt = '➜ guest@rad_ads_portfolio $ ';
        this.commandHistory = [];
        this.historyIndex = -1;
        this.commands = {
            about: () => this.showAbout(),
            clear: () => this.clear(),
            cls: () => this.clear(),
            contact: () => this.showContact(),
            experience: () => this.showExperience(),
            github: () => window.open('https://github.com/GangGreenTemperTatum', '_blank'),
            help: () => this.showHelp(),
            linkedin: () => window.open('https://linkedin.com/in/adamdawson0', '_blank'),
            projects: () => this.showProjects(),
            skills: () => this.showSkills(),
            speaking: () => window.open('https://ganggreentempertatum.github.io/speaking/', '_blank'),
            thoughtwork: () => this.showThoughtwork(),
        };

        this.init();
    }

    init() {
        this.showWelcome();
        this.createNewPrompt();
        document.addEventListener('keydown', (e) => this.handleInput(e));
    }

    showWelcome() {
        const welcome = `
<div class="welcome-container">
    <pre class="ascii-art">
╔═══════════════════════════════════════════════════╗
║                        ads                        ║
║            Staff AI Security Researcher           ║
║                                                  ║
║        Type 'help' for available commands        ║
║   GitHub: <a href="https://github.com/GangGreenTemperTatum" target="_blank">@GangGreenTemperTatum</a>          ║
╚═══════════════════════════════════════════════════╝
    </pre>
    <img src="assets/nyan_cat_gif.gif" alt="Welcome Animation" class="welcome-gif" style="width: 400px;"/>
    <br>
    <br>
</div>`;
        this.writeOutput(welcome);
    }

    createNewPrompt() {
        const promptLine = document.createElement('div');
        const promptSpan = document.createElement('span');
        const inputSpan = document.createElement('span');

        promptSpan.textContent = this.prompt;
        promptSpan.className = 'prompt';
        inputSpan.className = 'current-line';
        inputSpan.contentEditable = true;

        promptLine.appendChild(promptSpan);
        promptLine.appendChild(inputSpan);
        this.terminal.appendChild(promptLine);
        inputSpan.focus();
    }

    handleInput(e) {
        const currentLine = document.querySelector('.current-line');
        if (!currentLine) return;

        switch (e.key) {
            case 'Tab':
                e.preventDefault();
                const partial = currentLine.textContent.trim().toLowerCase();
                if (partial) {
                    const matches = Object.keys(this.commands).filter(cmd =>
                        cmd.startsWith(partial)
                    );
                    if (matches.length === 1) {
                        // Complete the command
                        currentLine.textContent = matches[0];
                    } else if (matches.length > 1) {
                        // Show possible completions
                        this.writeOutput(`\nPossible commands: ${matches.join(', ')}`);
                        this.createNewPrompt();
                        currentLine.textContent = partial;
                    }
                }
                break;

            case 'Enter':
                e.preventDefault();
                const command = currentLine.textContent.trim().toLowerCase();
                if (command) {
                    this.commandHistory.push(command);
                    this.historyIndex = this.commandHistory.length;
                }
                currentLine.removeAttribute('contenteditable');
                currentLine.classList.remove('current-line');
                this.executeCommand(command);
                this.createNewPrompt();
                break;

            case 'ArrowUp':
                e.preventDefault();
                if (this.commandHistory.length && this.historyIndex > 0) {
                    this.historyIndex--;
                    currentLine.textContent = this.commandHistory[this.historyIndex];
                }
                break;

            case 'ArrowDown':
                e.preventDefault();
                if (this.historyIndex < this.commandHistory.length - 1) {
                    this.historyIndex++;
                    currentLine.textContent = this.commandHistory[this.historyIndex];
                } else {
                    this.historyIndex = this.commandHistory.length;
                    currentLine.textContent = '';
                }
                break;
        }
    }

    executeCommand(command) {
        if (command === '') return;

        if (this.commands[command]) {
            this.commands[command]();
        } else {
            this.writeOutput(`Command not found: ${command}`, 'error');
        }
    }

    writeOutput(content, className = 'output') {
        const output = document.createElement('div');
        output.className = className;
        output.innerHTML = content;
        this.terminal.appendChild(output);
    }

    clear() {
        this.terminal.innerHTML = '';
    }

    showHelp() {
        const help = `
<pre>
Available commands:
------------------
help         - Show this help message
about        - Learn about me
clear        - Clear the terminal
contact      - Get my contact information
experience   - View my professional experience
github       - Visit my GitHub profile
linkedin     - Visit my LinkedIn profile
projects     - View my projects and activity
skills       - Some of my favorite tools and skills are
speaking     - View my speaking engagements
thoughtwork  - View my thoughtwork and talks
</pre>
`;
        this.writeOutput(help);
    }

    showAbout() {
        const about = `
<p>Hi, I'm Ads Dawson, a Staff AI Security Researcher.</p>
<p>I specialize in AI security, machine learning, and cybersecurity.</p>
<p>My work focuses on breaking boundaries and identifying emerging exploits in AI systems and pipelines, building adversarial capabilities by harnessing machine learning, and securing AI systems while developing robust AI models.</p>
<p>I love problem solving and harnessing code to conjure creative chaos. I'm all about <strong>think evil; do good</strong>.</p>
<p>I'm stoked to serve in the following roles:</p>
<ul>
<li><a target="_blank" href="https://owasp.org/www-project-top-10-for-large-language-model-applications/">OWASP Top 10 for Large Language Model Applications - Core Team Technical Lead, Entry Lead Expert and Founder of the project</a></li>
<li><a target="_blank" href="https://www.bugcrowd.com/blog/what-is-bugcrowds-hacker-advisory-board/">Member of the BugCrowd Hacker Advisory Board</a></li>
<li><a target="_blank" href="https://owasp.org/www-chapter-vancouver/">OWASP Vancouver Chapter Lead</a></li>
<li><a target="_blank" href="https://owasp.org/www-chapter-toronto/">OWASP Toronto Chapter Lead</a></li>
<li><a target="_blank" href="https://www.appsecvillage.com/">Defcon AppSec Village Volunteer</a>
<li><a target="_blank" href="https://cwe.mitre.org/community/working_groups.html">MITRE Artificial Intelligence Working Group (AI WG)</a></li>
</ul>`;
        this.writeOutput(about);
    }

    showProjects() {
        const projects = `
<pre>
Profile Summary:
--------------
Some notable projects I've worked on:

- <a href="https://github.com/dreadnode/burpference" target="_blank">burpference</a>: A web application for identifying and reporting security vulnerabilities in Burp Suite.
- <a href="https://github.com/GangGreenTemperTatum/stickyburp" target="_blank">stickyburp</a>: A Burp Suite extension written in Kotlin that enables persistent sticky session handling in web application testing.
- <a href="https://github.com/dreadnode/robopages" target="_blank">Robopages</a>: Robopages are YAML based files for describing tools to large language models (LLMs). They simplify the process of defining and using external tools in LLM-powered applications. By leveraging the robopages-cli function calling server, developers can avoid the tedious task of manually writing JSON declarations for each tool.
- <a href="https://github.com/GangGreenTemperTatum/DOMspy" target="_blank">DOMspy</a>: A typescript-based extension for identifying and reporting security vulnerabilities in web applications.
- <a href="https://github.com/dreadnode/dyana" target="_blank">dyana</a>: A sandbox environment designed for loading, running and profiling a wide range of files, including machine learning models, ELFs, Pickle, Javascript and more.
- <a href="https://github.com/Addepar/RedFlag" target="_blank">Redflag:</a>: RedFlag leverages AI to determine high-risk code changes. Run it in batch mode to scope manual security testing of release candidates, or run it in your CI pipelines to flag PRs and add the appropriate reviewers.
- <a href="https://github.com/OWASP/www-project-top-10-for-large-language-model-applications" target="_blank">OWASP Top 10 for LLM Applications:</a>: The OWASP Top 10 for Large Language Model Applications project is a community-driven effort to identify the top security risks for large language model applications.

View my interactive GitHub profile analytics at:
<a href="https://profile-summary-for-github.com/user/GangGreenTemperTatum" target="_blank">https://profile-summary-for-github.com/user/GangGreenTemperTatum</a>


My Projects and Activity:
------------
- GitHub public stats: <a href="https://github.com/GangGreenTemperTatum?tab=repositories&type=source" target="_blank">My Repositories</a>
- Recent contributions: <a href="https://github.com/GangGreenTemperTatum?tab=repositories&q=&type=fork" target="_blank">My Forks</a>
- Pull Requests: <a href="https://github.com/pulls?q=is%3Apr+author%3AGangGreenTemperTatum" target="_blank">My PRs</a>
- Activity Overview: <a href="https://github.com/GangGreenTemperTatum?tab=overview" target="_blank">My GitHub Activity</a>
- GitHub Stats: <a href="https://github.com/GangGreenTemperTatum?tab=achievements" target="_blank">My Achievements</a>
- Stars Given: <a href="https://github.com/GangGreenTemperTatum?tab=stars" target="_blank">My Starred Repos</a>
- Discussions: <a href="https://github.com/GangGreenTemperTatum?tab=discussions" target="_blank">My Discussions</a>
- Issues Created: <a href="https://github.com/issues?q=is%3Aissue+author%3AGangGreenTemperTatum" target="_blank">My Issues</a>
- Issue Comments: <a href="https://github.com/issues?q=commenter%3AGangGreenTemperTatum" target="_blank">My Comments</a>
- Gists: <a href="https://gist.github.com/GangGreenTemperTatum" target="_blank">My Gists</a>
- Followers: <a href="https://github.com/GangGreenTemperTatum?tab=followers" target="_blank">My Followers</a>
- Following: <a href="https://github.com/GangGreenTemperTatum?tab=following" target="_blank">Who I Follow</a>
- Packages: <a href="https://github.com/GangGreenTemperTatum?tab=packages" target="_blank">My Packages</a>
- Projects: <a href="https://github.com/GangGreenTemperTatum?tab=projects" target="_blank">My Project Boards</a>

Visualizations:
--------------
<!--- GitHub Skyline (3D contrib graph): <a href="https://skyline.github.com/GangGreenTemperTatum/2023" target="_blank">My 2023 Skyline</a>-->
- GitHub Profile Summary: <a href="https://profile-summary-for-github.com/user/GangGreenTemperTatum" target="_blank">Profile Summary</a>
- GitHub Streak Stats: <a href="https://github-readme-streak-stats.herokuapp.com/?user=GangGreenTemperTatum" target="_blank">Contribution Streak</a>
- GitHub Stats Card: <a href="https://github-readme-stats.vercel.app/api?username=GangGreenTemperTatum&show_icons=true&theme=gruvbox" target="_blank">Stats Dashboard</a>
- Top Languages: <a href="https://github-readme-stats.vercel.app/api/top-langs/?username=GangGreenTemperTatum&layout=compact&theme=gruvbox" target="_blank">Language Stats</a>
- Contribution Graph: <a href="https://github-contribution-graph.vercel.app/graph?username=GangGreenTemperTatum" target="_blank">Activity Graph</a>

You can also check my GitHub profile README at:
<a href="https://github.com/GangGreenTemperTatum/GangGreenTemperTatum?tab=readme-ov-file#-stats" target="_blank">@GangGreenTemperTatum GitHub public stats</a>
</pre>
`;
        this.writeOutput(projects);
    }

    showExperience() {
        const experience = `
<pre>
My Experience:
--------------
- Staff AI Security Researcher @ dreadnode
- Staff AI Full-stack Red-Teamer @ Cohere
- Senior Security Engineer @ SauceLabs
</pre>
`;
        this.writeOutput(experience);
    }

    showThoughtwork() {
        const thoughtwork = `
<pre>
My thoughtwork:
----------------
1. Gists: <a href="https://gist.github.com/GangGreenTemperTatum" target="_blank">@GangGreenTemperTatum Gists</a>
2. Hacker Spotlight: <a href="https://www.bugcrowd.com/blog/hacker-spotlight-ads-dawson/" target="_blank">@Bugcrowd Interview</a>
3. Inside The Mind of a Hacker 2024: <a href="https://www.bugcrowd.com/blog/inside-the-mind-of-a-hacker-2024-edition/" target="_blank">@Bugcrowd Feature</a>
4. Cohere Author: <a href="https://cohere.com/blog/authors/adsdawson" target="_blank">Cohere Author Page</a>
5. Writeups: <a href="https://github.com/GangGreenTemperTatum/CTFs/tree/main/Walkthroughs" target="_blank">CTF Writeups</a>
</pre>
`;
        this.writeOutput(thoughtwork);
    }

    showSkills() {
        const skills = `
<pre>
My Skills:
----------
- AI Security
- Machine Learning
- Penetration Testing
- Offensive Security
- Application Security
- Networking
- Cybersecurity
- Data Analysis
- Threat Hunting
- Python, Go, Shell
</pre>
`;
        this.writeOutput(skills);
    }

    showContact() {
        const contact = `
<pre>
Contact Me:
-----------
- LinkedIn: <a href="https://linkedin.com/in/adamdawson0" target="_blank">@adamdawson0</a>
- GitHub: <a href="https://github.com/GangGreenTemperTatum" target="_blank">@GangGreenTemperTatum</a>
- BuyMeACoffee: <a href="https://www.buymeacoffee.com/GangGreenTemperTatum" target="_blank">@GangGreenTemperTatum</a>
- OWASP Slack: <a href="https://join.slack.com/t/owasp/shared_invite/zt-1w2x2eqms-oAW_~vT1TnIBglt_SthJyQ" target="_blank">@ads</a>
- BlueSky Social: <a href="https://bsky.app/profile/did:plc:7ssxoijvxc6osziwmf35thhv" target="_blank">@rad-ads</a>
</pre>
`;
        this.writeOutput(contact);
    }
}

// Initialize the terminal when the page loads
window.addEventListener('load', () => {
    new Terminal();
});