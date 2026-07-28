# 🎓 Campus Sync

**An Enterprise Resource Planning (ERP) System Architecture**

Campus Sync is a highly scalable, cloud-native student management infrastructure developed specifically for the **GrasTech AWS Major Project**. It leverages serverless computing and dynamic frontend rendering to deliver a seamless administrative experience.

---

### 🏢 Team Cicada26
* **Somya Ranjan Tripathi** 
* **Vikas Gupta** 

---

### 🚀 Live Deployment
* **Application Interface:** [Campus Sync Portal](https://srtsubham.github.io/Campus-Sync/index.html)

### ⚙️ System Architecture & Technologies
* **Frontend:** HTML5, CSS3 (Glassmorphism UI), Vanilla JavaScript
* **Backend:** Python, AWS Serverless Application Model (SAM)
* **Infrastructure:** AWS Lambda, Amazon DynamoDB, API Gateway
* **Deployment & CI/CD:** GitHub Pages (Static Hosting), GitHub Actions

### 💡 Core Features
* **Distributed Registration:** High-throughput student data intake system.
* **Serverless Execution:** On-demand compute scaling via AWS Lambda to eliminate idle resource costs.
* **NoSQL Database Integration:** Low-latency data persistence using DynamoDB.
* **Secure API Routing:** Managed endpoint distribution through AWS API Gateway.

### 🛠️ Local Installation & Build

1. Clone the repository:
   ```bash
   git clone [https://github.com/srtsubham/Campus-Sync.git](https://github.com/srtsubham/Campus-Sync.git)
2. Navigate to the infrastructure directory and build the AWS container:

    cd Campus-Sync
    sam build

3. Deploy the backend architecture:

    sam deploy --guided