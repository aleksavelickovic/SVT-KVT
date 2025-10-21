package rs.ac.ftn.svt.events.service;

import rs.ac.ftn.svt.events.model.dto.AccountRequestDTO;
import rs.ac.ftn.svt.events.model.entity.AccountRequest;

import java.util.List;

public interface AccountRequestService {

    List<AccountRequest> findAll();

    AccountRequest findOne(Long id);

    AccountRequest createAccountRequest(AccountRequestDTO accountRequestDTO);

    AccountRequest save(AccountRequest accountRequest);

}
