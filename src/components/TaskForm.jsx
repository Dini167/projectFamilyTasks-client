import { useState } from 'react';
import { createTask, updateTask } from '../api/tasksApi';
import { FREQUENCY_LABELS, TIME_OF_DAY_LABELS } from '../api/labels';
import useSubmit from '../hooks/useSubmit';
import FormErrors from './FormErrors';
import SelectField from './SelectField';
import TextField from './TextField';

const EMPTY_TASK = {
  description: '',
  minAge: 6,
  estimatedMinutes: 15,
  timeOfDay: 0,
  frequency: 0,
  pointsValue: 5,
  categoryIds: [],
};

const toForm = (task) => ({ ...task, categoryIds: task.categories.map((category) => category.id) });

export default function TaskForm({ task, categories, onSaved, onCancel }) {
  const [form, setForm] = useState(task ? toForm(task) : EMPTY_TASK);
  const bind = (key) => ({
    value: form[key],
    onChange: (e) => setForm({ ...form, [key]: e.target.value }),
  });

  const toggleCategory = (id) => {
    const ids = form.categoryIds.includes(id)
      ? form.categoryIds.filter((current) => current !== id)
      : [...form.categoryIds, id];
    setForm({ ...form, categoryIds: ids });
  };

  const { busy, errors, submit } = useSubmit(async () => {
    const body = {
      description: form.description,
      minAge: Number(form.minAge),
      estimatedMinutes: Number(form.estimatedMinutes),
      timeOfDay: Number(form.timeOfDay),
      frequency: Number(form.frequency),
      pointsValue: Number(form.pointsValue),
      categoryIds: form.categoryIds,
    };
    await (task ? updateTask(task.id, body) : createTask(body));
    onSaved();
  });

  return (
    <form className="panel" onSubmit={submit}>
      <h3>{task ? 'עריכת משימה' : 'משימה חדשה'}</h3>
      <TextField label="תיאור המשימה" maxLength={200} {...bind('description')} />
      <div className="row">
        <TextField label="גיל מינימלי" type="number" min="0" max="20" {...bind('minAge')} />
        <TextField label="דקות לביצוע" type="number" min="1" max="600" {...bind('estimatedMinutes')} />
        <TextField label="נקודות" type="number" min="1" max="1000" {...bind('pointsValue')} />
      </div>
      <div className="row">
        <SelectField label="זמן ביום" options={TIME_OF_DAY_LABELS} {...bind('timeOfDay')} />
        <SelectField label="תדירות" options={FREQUENCY_LABELS} {...bind('frequency')} />
      </div>
      <fieldset className="categories">
        <legend>קטגוריות</legend>
        {categories.map((category) => (
          <label key={category.id}>
            <input
              type="checkbox"
              checked={form.categoryIds.includes(category.id)}
              onChange={() => toggleCategory(category.id)}
            />
            {category.name}
          </label>
        ))}
      </fieldset>
      <FormErrors errors={errors} />
      <div className="row">
        <button type="submit" className="button" disabled={busy}>
          {busy ? 'שומר...' : 'שמירה'}
        </button>
        <button type="button" className="button secondary" onClick={onCancel}>
          ביטול
        </button>
      </div>
    </form>
  );
}
