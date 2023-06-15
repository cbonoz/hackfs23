<br/>
<p align='center'>
    <img src="./img/logo.png" width=400 />
</p>
<br/>

FeatureChain
---

FeatureChain is an open source decentralized app that empowers users to create and manage public feature request boards without using centralized platform authorities such as Jira or Trello.

Live demo  (testnet):

Video: 

### Motivation

Existing apps like Trello and Jira have made significant contributions to project management and collaboration, but they have limitations when it comes to managing public feature requests. A decentralized app can provide a revolutionary solution that addresses these shortcomings and offers unique benefits for effective feature request management.

Trello is widely recognized for its user-friendly interface and visual approach to task management. However, it lacks specialized features specifically designed for managing feature requests. Its primary focus is on task and project management, making it less suitable for collecting, organizing, and prioritizing feature ideas from a large user base. In contrast, a decentralized app can be purpose-built to cater to the needs of users primarily interested in suggesting and voting on new features. It can provide dedicated features such as voting mechanisms, status tracking, and customizable categorization to effectively manage and prioritize feature requests.

On the other hand, Jira is a comprehensive project management tool favored by development teams. While it offers advanced features for issue tracking and workflow management, its complexity can be overwhelming, especially for non-technical stakeholders who want to contribute feature ideas. A decentralized app can bridge this gap by providing a simplified and user-friendly interface that encourages participation from a wider audience. By removing unnecessary complexities, it enables non-technical users to easily submit feature requests, contribute feedback, and engage in the decision-making process.

Additionally, both Trello and Jira suffer from a centralized approach to feature request management. They rely on a central authority or project administrators to review and prioritize requests, which can lead to delays and lack of transparency. A decentralized app, built on blockchain technology, can introduce decentralized governance and transparency. Users can directly participate in the decision-making process, with voting mechanisms ensuring that popular feature requests are given higher priority. 

FeatureChain currently supports creating new boards with custom images, accepting public requests and votes, and having them managed for free using decentralized tooling.


## Technologies used

FeatureChain 

* 


### Storage/Notifications

* Filecoin and Web3.storage: Used for file storage, image, and artifact storage for board metadata and requests.
* Polybase: Acts as a decentralized web3 Firebase. Used for link dashboards for a given account. With Polybase, FeatureChain doesn't need a hosted backed for owner accounts and instead add and pulls lists of active links for a given accounts from a 'FeatureChain' collection based on the active account wallet address.
* Push protocol: The owner of a board receives a notification through push protocol when a new request is published to the board.
* Ceramic: Data interoperability with polybase.
* Spheron: Hosting and CICD of the board platform.



### How to run

1. Define the following env variables (either locally or in a created `.env` file). These are configured with test values on the demo site.

<pre>
    REACT_APP_POLYBASE_NAMESPACE= # Optional custom namespace for polybase deployment/backend.
    REACT_APP_COVALENT_KEY= # Covalent api key used to power history page.
    REACT_APP_PUSH_PK= # Optional push protocol wallet private key for connected FeatureChain staging channel.
</pre>

2. `yarn; yarn start`
3. 
### Example featurechain pages (try these out!)

Connect to the appropriate network via metamask and visit the following links.

You'll be redirected to the set url (in this case google.com) with a tracking transaction record appending to the FeatureChain contract.


### Screenshots

#### Home
<img src="./img/home.png" width=800 />

### Useful links

Event page:  https://ethglobal.com/events/hackfs2023/home
Sponsors: https://ethglobal.com/events/hackfs2023/prizes

### Potential Future Work:

Governance-as-a-Service: Expand decentralized governance capabilities to offer Governance-as-a-Service to other decentralized applications.

Enhanced Collaboration Features: Improve collaboration tools within the platform, including real-time chat, task assignment, and project management functionalities.

Integration with Web3 Ecosystem: Explore integration with other Web3 technologies like decentralized identity solutions or decentralized storage networks.

### Revenue Opportunities:

Premium Feature Tiers: Introduce premium feature tiers with advanced functionality, custom integrations, and dedicated support for power users and businesses.

Data-driven Insights and Analytics: Offer comprehensive analytics reports, trend analysis, and user sentiment analysis as a subscription-based service.

Sponsored Feature Requests: Implement a sponsorship model where businesses pay to prioritize their feature requests for increased visibility and additional revenue.


<!-- 

Demo flow:
Introduction and Overview (30 seconds)

Introduce the presenter and briefly explain the purpose of the demo.
Provide a high-level overview of FeatureChain and its main benefits.
Time Allocation: 30 seconds
Comparison to Existing Solutions (1 minute)

Present a brief comparison of existing solutions like Trello and Jira.
Highlight the limitations of these solutions in managing public feature requests.
Emphasize how FeatureChain fills the gaps and offers a decentralized approach for effective feature request management.
Time Allocation: 1 minute
Submitting a Feature Request (1 minute)

Demonstrate how users can easily submit a feature request through the app.
Walk through the process of filling in request details and attaching supporting files.
Emphasize the simplicity and user-friendliness of the submission process.
Time Allocation: 1 minute
Collaborative Voting and Decentralized Governance (1 minute)

Showcase the collaborative voting system and decentralized governance of FeatureChain.
Show how users can browse and vote on feature requests based on their priorities.
Explain how decentralized decision-making ensures transparency and inclusivity.
Time Allocation: 1 minute
Revenue Opportunities (30 seconds)

Discuss the potential revenue opportunities available for FeatureChain.
Mention premium feature tiers, data-driven insights as a service, and the sponsored feature requests model.
Provide a brief overview of how these revenue streams can support the growth and sustainability of FeatureChain.
Time Allocation: 30 seconds
Conclusion and Call to Action (30 seconds)

Recap the key features and benefits of FeatureChain.
Encourage participants to explore the app further, engage with its features, and provide feedback.
Share contact information or any next steps for further engagement with the project.
Time Allocation: 30 seconds


Sponsors:



-->