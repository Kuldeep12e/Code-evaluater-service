graph TB
    %% Client Section
    A[Client] -->|Submission Request| B[Evaluator Service]
    
    %% Evaluator Service Section
    B --> C[Request Queue<br/>Redis/Celery]
    C --> D[Submission Processor]
    
    %% Docker Container Management
    D --> E[Container Manager]
    E --> F[Docker Engine]
    F --> G[Language-Specific<br/>Container Images]
    
    %% Container Execution Flow
    G --> H[Create Container]
    H --> I[Load Code &<br/>Dependencies]
    I --> J[Execute Test Cases]
    J --> K[Resource Monitoring<br/>CPU/Memory/Timeout]
    
    %% Results Processing
    K --> L[Collect Results]
    L --> M[Cleanup Container]
    M --> N[Results Formatter]
    N --> O[Database Storage]
    O --> P[Response to Client]
    
    %% Support Services
    Q[Config Manager<br/>Language Settings] --> E
    R[Security Manager<br/>Sandbox Policies] --> H
    S[Logging Service] --> D
    S --> J
    S --> L
    
    %% Styling
    classDef client fill:#e1f5fe
    classDef service fill:#f3e5f5
    classDef docker fill:#e8f5e8
    classDef storage fill:#fff3e0
    classDef support fill:#fce4ec
    
    class A client
    class B,C,D service
    class E,F,G,H,I,J,K,L,M docker
    class N,O,P storage
    class Q,R,S support