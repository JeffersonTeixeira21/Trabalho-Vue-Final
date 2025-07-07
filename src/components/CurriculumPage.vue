<template>
  <div class="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-8 mb-8">
    <button @click="openModal" class="mb-6 px-6 py-3 rounded-lg bg-gray-700 text-white font-bold shadow hover:bg-gray-900 transition">
      Criar Currículo
    </button>

    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 relative animate-fade-in max-h-screen overflow-y-auto">
        <button @click="closeModal" class="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-2xl font-bold">&times;</button>
        <h2 class="text-2xl font-bold mb-6 text-gray-800">{{ editIndex === null ? 'Criação de Currículo' : 'Editar Currículo' }}</h2>
        <form @submit.prevent="submitForm" class="space-y-5">
          <div>
            <label class="block font-semibold mb-1">Nome completo <span class="text-red-500">*</span></label>
            <input v-model="form.nome" type="text" required 
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-600 transition"
              placeholder="Seu nome completo" />
          </div>
          <div>
            <label class="block font-semibold mb-1">E-mail <span class="text-red-500">*</span></label>
            <input v-model="form.email" type="email" required 
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-600 transition"
              placeholder="seu@email.com" @blur="validateEmail" />
            <span v-if="emailError" class="text-red-500 text-sm">E-mail inválido</span>
          </div>
          <div>
            <label class="block font-semibold mb-1">Telefone <span class="text-red-500">*</span></label>
            <input v-model="form.telefone" type="text" required 
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-600 transition"
              placeholder="(99) 99999-9999" @input="maskPhone" maxlength="15" />
          </div>
          <div>
            <label class="block font-semibold mb-1">Endereço</label>
            <input v-model="form.endereco" type="text" 
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-600 transition"
              placeholder="Rua, número, bairro, cidade" />
          </div>
          <div>
            <label class="block font-semibold mb-1">Resumo profissional</label>
            <textarea v-model="form.resumo" 
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-600 transition"
              rows="3" placeholder="Fale um pouco sobre você"></textarea>
          </div>
          <div>
            <label class="block font-semibold mb-1">Experiências profissionais</label>
            <div v-for="(exp, i) in form.experiencias" :key="i" class="mb-2 flex gap-2">
              <input v-model="form.experiencias[i]" type="text" 
                class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-600 transition flex-1" 
                placeholder="Ex: Empresa, cargo, período" />
              <button type="button" @click="removeExp(i)" class="text-red-500 font-bold">&times;</button>
            </div>
            <button type="button" @click="addExp" class="text-blue-600 hover:underline text-sm">+ Adicionar experiência</button>
          </div>
          <div>
            <label class="block font-semibold mb-1">Formação acadêmica</label>
            <div v-for="(formacao, i) in form.formacoes" :key="i" class="mb-2 flex gap-2">
              <input v-model="form.formacoes[i]" type="text" 
                class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-600 transition flex-1" 
                placeholder="Ex: Curso, instituição, ano" />
              <button type="button" @click="removeFormacao(i)" class="text-red-500 font-bold">&times;</button>
            </div>
            <button type="button" @click="addFormacao" class="text-blue-600 hover:underline text-sm">+ Adicionar formação</button>
          </div>
          <div>
            <label class="block font-semibold mb-1">Habilidades</label>
            <input v-model="form.habilidades" type="text" 
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-600 transition"
              placeholder="Separe por vírgula (Ex: JavaScript, Liderança)" />
          </div>
          <div>
            <label class="block font-semibold mb-1">Links</label>
            <input v-model="form.links" type="text" 
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-600 transition"
              placeholder="LinkedIn, GitHub, portfólio..." />
          </div>
          <button type="submit" class="w-full py-3 rounded-lg font-bold bg-gray-700 text-white hover:bg-gray-900 transition">Salvar Currículo</button>
        </form>
      </div>
    </div>

    <div class="mt-10">
      <h3 class="text-xl font-bold mb-4 text-gray-800">Meus Currículos</h3>
      <ul v-if="curriculos.length" class="space-y-4">
        <li v-for="(cv, idx) in curriculos" :key="cv._id || idx" class="bg-gray-100 rounded-lg p-4 shadow flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <div class="font-bold text-lg text-gray-700">{{ cv.nome }}</div>
            <div class="text-gray-600 text-sm">{{ cv.email }}</div>
          </div>
          <div class="flex gap-2 mt-2 md:mt-0">
            <button @click="viewCV(cv)" class="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-800 transition">Visualizar</button>
            <button @click="editCV(idx)" class="px-3 py-1 rounded bg-yellow-500 text-white hover:bg-yellow-700 transition">Editar</button>
            <button @click="deleteCV(cv._id, idx)" class="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-800 transition">Excluir</button>
            <button @click="exportCVToPDF(cv)" class="px-3 py-1 rounded bg-purple-600 text-white hover:bg-purple-800 transition">Exportar PDF</button>
          </div>
        </li>
      </ul>
      <div v-else class="text-gray-500">Nenhum currículo cadastrado ainda.</div>
    </div>

    <div v-if="showViewModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 relative animate-fade-in">
        <button @click="showViewModal = false" class="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-2xl font-bold">&times;</button>
        <h2 class="text-2xl font-bold mb-6 text-gray-800">Visualizar Currículo</h2>
        <div class="space-y-2">
          <div><span class="font-semibold">Nome:</span> {{ selectedCV.nome }}</div>
          <div><span class="font-semibold">E-mail:</span> {{ selectedCV.email }}</div>
          <div><span class="font-semibold">Telefone:</span> {{ selectedCV.telefone }}</div>
          <div><span class="font-semibold">Endereço:</span> {{ selectedCV.endereco }}</div>
          <div><span class="font-semibold">Resumo:</span> {{ selectedCV.resumo }}</div>
          <div><span class="font-semibold">Experiências:</span>
            <ul class="list-disc ml-6">
              <li v-for="(exp, i) in selectedCV.experiencias" :key="i">{{ exp }}</li>
            </ul>
          </div>
          <div><span class="font-semibold">Formação:</span>
            <ul class="list-disc ml-6">
              <li v-for="(formacao, i) in selectedCV.formacoes" :key="i">{{ formacao }}</li>
            </ul>
          </div>
          <div><span class="font-semibold">Habilidades:</span> {{ selectedCV.habilidades }}</div>
          <div><span class="font-semibold">Links:</span> {{ selectedCV.links }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import jsPDF from 'jspdf';

export default {
  data() {
    return {
      showModal: false,
      showViewModal: false,
      editIndex: null,
      curriculos: [],
      selectedCV: {},
      form: {
        nome: '',
        email: '',
        telefone: '',
        endereco: '',
        resumo: '',
        experiencias: [''],
        formacoes: [''],
        habilidades: '',
        links: '',
      },
      emailError: false,
    };
  },
  mounted() {
    this.fetchCVs();
  },
  methods: {
    openModal() {
      this.resetForm();
      this.showModal = true;
      this.editIndex = null;
    },
    closeModal() {
      this.showModal = false;
      this.editIndex = null;
    },
    async fetchCVs() {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/curriculos', {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.curriculos = res.data;
      } catch (err) {
        this.curriculos = [];
      }
    },
    async submitForm() {
      this.validateEmail();
      if (this.emailError) return;
      try {
        const token = localStorage.getItem('token');
        if (this.editIndex === null) {
          // Novo currículo
          const res = await axios.post('/curriculos', this.form, {
            headers: { Authorization: `Bearer ${token}` }
          });
          this.curriculos.push(res.data);
        } else {
          // Editar currículo
          const id = this.curriculos[this.editIndex]._id;
          await axios.put(`/curriculos/${id}`, this.form, {
            headers: { Authorization: `Bearer ${token}` }
          });
        }
        this.closeModal();
        this.resetForm();
      } catch (err) {
        alert('Erro ao salvar currículo.');
      }
    },
    viewCV(cv) {
      this.selectedCV = cv;
      this.showViewModal = true;
    },
    editCV(idx) {
      this.form = { ...this.curriculos[idx] };
      // Garantir arrays para experiências e formações
      this.form.experiencias = this.form.experiencias || [''];
      this.form.formacoes = this.form.formacoes || [''];
      this.showModal = true;
      this.editIndex = idx;
    },
    async deleteCV(id, idx) {
      if (!confirm('Tem certeza que deseja excluir este currículo?')) return;
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`/curriculos/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.curriculos.splice(idx, 1);
      } catch (err) {
        alert('Erro ao excluir currículo.');
      }
    },
    validateEmail() {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.emailError = !re.test(this.form.email);
    },
    maskPhone(e) {
      let v = this.form.telefone.replace(/\D/g, '');
      if (v.length > 11) v = v.slice(0, 11);
      if (v.length > 6) {
        v = v.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
      } else if (v.length > 2) {
        v = v.replace(/(\d{2})(\d{0,5})/, '($1) $2');
      } else {
        v = v.replace(/(\d{0,2})/, '($1');
      }
      this.form.telefone = v.trim();
    },
    addExp() {
      this.form.experiencias.push('');
    },
    removeExp(i) {
      this.form.experiencias.splice(i, 1);
    },
    addFormacao() {
      this.form.formacoes.push('');
    },
    removeFormacao(i) {
      this.form.formacoes.splice(i, 1);
    },
    resetForm() {
      this.form = {
        nome: '',
        email: '',
        telefone: '',
        endereco: '',
        resumo: '',
        experiencias: [''],
        formacoes: [''],
        habilidades: '',
        links: '',
      };
      this.emailError = false;
    },
    exportCVToPDF(cv) {
      const doc = new jsPDF();
      let y = 10;
      doc.setFontSize(16);
      doc.text(`Currículo: ${cv.nome || ''}`, 10, y);
      y += 10;
      doc.setFontSize(12);
      doc.text(`E-mail: ${cv.email || ''}`, 10, y);
      y += 8;
      doc.text(`Telefone: ${cv.telefone || ''}`, 10, y);
      y += 8;
      doc.text(`Endereço: ${cv.endereco || ''}`, 10, y);
      y += 8;
      doc.text(`Resumo: ${cv.resumo || ''}`, 10, y);
      y += 10;
      doc.text('Experiências:', 10, y);
      y += 6;
      (cv.experiencias || []).forEach(exp => {
        if (y > 270) { doc.addPage(); y = 10; }
        doc.text(`- ${exp}`, 14, y);
        y += 6;
      });
      y += 2;
      doc.text('Formações:', 10, y);
      y += 6;
      (cv.formacoes || []).forEach(formacao => {
        if (y > 270) { doc.addPage(); y = 10; }
        doc.text(`- ${formacao}`, 14, y);
        y += 6;
      });
      y += 2;
      doc.text(`Habilidades: ${cv.habilidades || ''}`, 10, y);
      y += 8;
      doc.text(`Links: ${cv.links || ''}`, 10, y);
      doc.save(`curriculo_${cv.nome || 'export'}.pdf`);
    },
  },
};
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: scale(0.98); }
  to { opacity: 1; transform: scale(1); }
}
.animate-fade-in {
  animation: fade-in 0.2s;
}
</style>