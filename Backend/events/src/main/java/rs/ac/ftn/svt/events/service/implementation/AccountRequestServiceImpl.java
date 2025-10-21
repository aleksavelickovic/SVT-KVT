package rs.ac.ftn.svt.events.service.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rs.ac.ftn.svt.events.model.dto.AccountRequestDTO;
import rs.ac.ftn.svt.events.model.entity.AccountRequest;
import rs.ac.ftn.svt.events.model.entity.RequestStatus;
import rs.ac.ftn.svt.events.repository.AccountRequestRepository;
import rs.ac.ftn.svt.events.service.AccountRequestService;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
class AccountRequestServiceImpl implements AccountRequestService {

    @Autowired
    private AccountRequestRepository accountRequestRepository;

    @Override
    public List<AccountRequest> findAll() {
        return accountRequestRepository.findAll();
    }

    @Override
    public AccountRequest findOne(Long id) {
        return accountRequestRepository.findFirstById((id));
    }

    @Override
    public AccountRequest createAccountRequest(AccountRequestDTO accountRequestDTO) {
        Optional<AccountRequest> accountRequest = accountRequestRepository.findFirstByEmail(accountRequestDTO.getEmail());

        if (accountRequest.isPresent()) {
            return null;
        }

        AccountRequest newAccountRequest = new AccountRequest();
        newAccountRequest.setCreatedAt(LocalDate.now());
        newAccountRequest.setEmail(accountRequestDTO.getEmail());
        newAccountRequest.setPassword(accountRequestDTO.getPassword());
        newAccountRequest.setAddress(accountRequestDTO.getAddress());
        newAccountRequest.setStatus(RequestStatus.PENDING);
        newAccountRequest.setRejectionReason(accountRequestDTO.getRejectionReason());

        newAccountRequest = accountRequestRepository.save(newAccountRequest);

        return newAccountRequest;
    }

    @Override
    public AccountRequest save(AccountRequest accountRequest) {
        return accountRequestRepository.save(accountRequest);
    }
}
