import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

/**
 * Interfaz que define la estructura de los datos de configuración.
 * Al usar una interfaz, TypeScript nos avisa si nos falta algún campo
 * o si pasamos un tipo de dato incorrecto.
 */
export interface UserSettings {
  username: string;
  email: string;
  language: string;
  notifications: boolean;
  darkMode: boolean;
}

/**
 * Componente HIJO: settings-form
 * 
 * Su responsabilidad es mostrar y manejar el formulario.
 * Se comunica con el padre de dos formas:
 *   - Recibe datos del padre via @Input()
 *   - Envía datos al padre via @Output()
 */
@Component({
  selector: 'app-settings-form',
  standalone: true,
  imports: [
    CommonModule,         // Directivas básicas: *ngIf, *ngFor, etc.
    FormsModule,          // Necesario para usar [(ngModel)] en el formulario
    MatFormFieldModule,   // Contenedor visual de los campos (mat-form-field)
    MatInputModule,       // Estilo de Angular Material para los <input>
    MatButtonModule,      // Estilos para los botones (mat-flat-button, etc.)
    MatSlideToggleModule, // Interruptor on/off (como un switch)
    MatSelectModule,      // Dropdown de Angular Material (mat-select)
    MatIconModule,        // Iconos de Material (mat-icon)
  ],
  templateUrl: './settings-form.component.html',
})
export class SettingsFormComponent {

  /**
   * @Input() — ENTRADA de datos desde el componente PADRE.
   * El padre le pasa un objeto UserSettings a este componente.
   * Si el padre no pasa nada, se usan estos valores por defecto.
   * 
   * Uso en el padre:
   *   <app-settings-form [settings]="currentSettings" />
   */
  @Input() settings: UserSettings = {
    username: '',
    email: '',
    language: 'en',
    notifications: true,
    darkMode: false,
  };

  /**
   * @Output() — SALIDA de datos hacia el componente PADRE.
   * Emite un evento con los datos del formulario cuando el usuario
   * hace clic en "Save changes".
   * 
   * EventEmitter<UserSettings> indica que el evento llevará
   * un objeto de tipo UserSettings como payload.
   * 
   * Uso en el padre:
   *   <app-settings-form (settingsSaved)="onSettingsSaved($event)" />
   */
  @Output() settingsSaved = new EventEmitter<UserSettings>();

  /**
   * @Output() — SALIDA sin datos (void) hacia el componente PADRE.
   * Solo notifica que el usuario canceló, no necesita enviar datos.
   * 
   * Uso en el padre:
   *   <app-settings-form (settingsCancelled)="onSettingsCancelled()" />
   */
  @Output() settingsCancelled = new EventEmitter<void>();

  /**
   * Lista de idiomas disponibles en el dropdown.
   * Cada objeto tiene un value (lo que se guarda) 
   * y un label (lo que ve el usuario).
   */
  languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
    { value: 'fr', label: 'Français' },
  ];

  /**
   * Se ejecuta cuando el usuario hace clic en "Save changes".
   * Emite una COPIA del objeto settings usando spread operator { ...this.settings }
   * para evitar pasar la referencia directa (buena práctica).
   */
  onSave() {
    this.settingsSaved.emit({ ...this.settings });
  }

  /**
   * Se ejecuta cuando el usuario hace clic en "Cancel".
   * Emite el evento sin datos, solo para notificar al padre.
   */
  onCancel() {
    this.settingsCancelled.emit();
  }
}