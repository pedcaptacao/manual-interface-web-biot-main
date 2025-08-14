# -*- coding: utf-8 -*-
import os

# --- Script para corrigir caminhos relativos em todos os arquivos HTML ---
# Alvo: Substituir "../res/" por "res/"

# O diretório onde o script está sendo executado
project_directory = '.'
files_changed_count = 0

print("Iniciando a correção de caminhos nos arquivos HTML...")

# Percorre todos os arquivos e pastas a partir do diretório atual
for root, dirs, files in os.walk(project_directory):
    # Ignora a pasta .git para segurança
    if '.git' in dirs:
        dirs.remove('.git')

    for filename in files:
        # Processa apenas arquivos que terminam com .html
        if filename.endswith('.html'):
            file_path = os.path.join(root, filename)
            
            try:
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
            except IOError as e:
                print(f"  -> Erro ao ler o arquivo: {file_path} ({e})")
                continue

            # Verifica se o conteúdo precisa ser alterado
            if '../res/' in content:
                # Substitui todas as ocorrências
                new_content = content.replace('../res/', 'res/')
                
                try:
                    # Salva o arquivo com o novo conteúdo
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Caminhos corrigidos em: {file_path}")
                    files_changed_count += 1
                except IOError as e:
                    print(f"  -> ERRO AO SALVAR: {file_path} ({e})")

if files_changed_count == 0:
    print("\nNenhum arquivo precisou de correção.")
else:
    print(f"\nProcesso concluído. {files_changed_count} arquivo(s) foram modificados.")

