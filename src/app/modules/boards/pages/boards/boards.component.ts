import { Component, OnInit } from '@angular/core';
import { faBox, faWaveSquare, faClock, faAngleUp, faAngleDown, faHeart, faBorderAll, faUsers, faGear } from '@fortawesome/free-solid-svg-icons';
import { faTrello } from '@fortawesome/free-brands-svg-icons';
import { User } from '@models/user.model';
import { Project } from '@models/project.model';
import { AuthService } from '@services/auth.service';
import { ProjectService } from '@services/project.service';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html'
})
export class BoardsComponent implements OnInit {

  faTrello = faTrello;
  faBox = faBox;
  faWaveSquare = faWaveSquare;
  faClock = faClock;
  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;
  faHeart = faHeart;
  faBorderAll = faBorderAll;
  faUsers = faUsers;
  faGear = faGear;

  user: User | null = null;
  projects: Project [] = [];
  
  constructor(
      private projectService: ProjectService,
      private authService: AuthService
  ) {}
  
    ngOnInit(): void {
      this.getProjects();
      this.authService.user$
      .subscribe(user => {
        this.user = user;
      })
    }
  
    getProjects() {
      this.projectService.getProjects()
      .subscribe((projects: Project[]) => {
        this.projects = projects;
      })
    }

    updateProject(projectData: Project) {
      this.projectService.updateProject(projectData).subscribe(
        (updatedProject) => {
          const index = this.projects.findIndex(p => p.id === updatedProject.id);
          if (index !== -1) {
            this.projects[index] = updatedProject;
          }
        },
        (error) => {
          // Manejar el error adecuadamente
          console.error(error);
        }
      );
    }

    createProject(projectData: Project) {
      this.projectService.createProject(projectData).subscribe(
        (newProject) => {
          this.projects.push(newProject);
        },
        (error) => {
          // Manejar el error adecuadamente
          console.error(error);
        }
      );
    }

    deleteProject(projectId: string) {
      this.projectService.deleteProject(projectId).subscribe(
        () => {
          this.projects = this.projects.filter(p => p.id !== projectId);
        },
        (error) => {
          // Manejar el error adecuadamente
          console.error(error);
        }
      );
    }

  }
